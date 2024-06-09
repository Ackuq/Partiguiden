import { twMerge } from "tailwind-merge";

import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import SocialMediaShare from "@components/common/social-media-share";
import getDocumentHtml from "@lib/api/documents/get-document-html";
import { getDocumentJson } from "@lib/api/documents/get-document-json";

interface Props {
  params: {
    id: string;
  };
}

export default async function Document({ params: { id } }: Props) {
  const [html, data] = await Promise.all([
    getDocumentHtml(id),
    getDocumentJson(id),
  ]);

  return (
    <main>
      <PageTitle>
        {data.id}: {data.title}
      </PageTitle>
      <Container>
        <SocialMediaShare title={`${data.id}: ${data.title}`} />
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={twMerge(
            "dark:[&_*]:!border-slate-50 dark:[&_*]:!text-slate-50",
          )}
        />
      </Container>
    </main>
  );
}

export const runtime = "edge";

export async function generateMetadata({ params: { id } }: Props) {
  const data = await getDocumentJson(id);
  return {
    title: `${data.id}: ${data.title} | Dokument | Partiguiden`,
  };
}
