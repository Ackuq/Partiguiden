import PromisePool from "@supercharge/promise-pool";

import getProtocols from "@lib/api/parliament/get-protocols";
import type {
  DocumentList,
  DocumentListEntry,
} from "@lib/api/parliament/types";

import getSpeaker from "../get-speaker";
import getSpeech from "../get-speech";
import type { Debate } from "../types";

function getSpeechesDocuments(document: DocumentListEntry) {
  const debate = document.debatt;
  if (!debate) {
    return [];
  }
  const speechesDocuments = debate.anforande;
  if (Array.isArray(speechesDocuments)) {
    return speechesDocuments;
  }
  return [speechesDocuments];
}

export default async function parseDebate(
  data: DocumentList,
): Promise<Debate | undefined> {
  const document = data.dokumentlista.dokument?.[0];

  if (!document) {
    return;
  }

  const {
    dok_id: id,
    titel: title,
    undertitel: subtitle,
    debattnamn: type,
    datum: date,
  } = document;

  const protocols = await getProtocols({
    rm: document.rm,
    from: document.debattdag,
    to: document.debattdag,
  });
  const protocolId = protocols?.dokumentlista.dokument?.[0].id;

  const senderId = document.dokintressent?.intressent.find(
    (intressent) => intressent.roll === "undertecknare",
  )?.intressent_id;

  const speechesDocuments = getSpeechesDocuments(document);

  const speechesPromises = PromisePool.withConcurrency(10)
    .for(speechesDocuments.filter((speech) => speech.talare !== "TALMANNEN"))
    .process(async (statement) => {
      if (!protocolId) {
        return Promise.reject();
      }
      const speech = await getSpeech(protocolId, statement.anf_nummer);
      if (!speech) {
        return Promise.reject();
      }
      return {
        ...speech,
        number: statement.anf_nummer,
        date: statement.anf_datumtid,
      };
    });

  const speakerIds = new Set(
    speechesDocuments.map((speech) => speech.intressent_id),
  );
  const speakerPromises = PromisePool.withConcurrency(10)
    .for(speakerIds)
    .process(getSpeaker);

  const webTVUrl = `https://www.riksdagen.se/views/pages/embedpage.aspx?did=${id}`;

  const [speakerList, speechesList] = await Promise.all([
    speakerPromises,
    speechesPromises,
  ]);

  const speakers = speakerList.results.reduce((prev, current) => {
    if (current === undefined) {
      return prev;
    }
    return { ...prev, [current.id]: current };
  }, {});

  // TODO: Handle speeches from talmannen as well
  const statements = speechesList.results.filter(
    (speech) => speech.speakerId !== "",
  );
  return {
    id,
    title,
    subtitle,
    type,
    date,
    webTVUrl,
    senderId,
    speakers,
    statements,
  };
}
