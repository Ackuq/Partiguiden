import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import Accordion from "@components/common/accordion";
import BreadcrumbsSocialMediaShare from "@components/common/breadcrumbs-social-media-share";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import { Divider } from "@components/common/divider";
import PageTitle from "@components/common/page-title";
import getVote from "@lib/api/vote/get-vote";
import { routes } from "@lib/navigation";

import { Appendix } from "./components/appendix";
import { Documents } from "./components/documents";

const ResponsiveAd = dynamic(() => import("@components/ads/responsive-ad"), {
  ssr: false,
});

const TotalVote = dynamic(() => import("./components/total-vote"), {
  ssr: false,
  loading: () => (
    <div role="status" className="h-[6.5rem] sm:h-24">
      <div className="h-10 bg-slate-200 dark:bg-slate-900" />
      <div className="mt-2 h-6 bg-slate-200 dark:bg-slate-900"></div>
    </div>
  ),
});

const VoteDistribution = dynamic(
  () => import("./components/vote-distribution"),
  {
    ssr: false,
  },
);

interface Props {
  params: {
    id: string;
    bet: string;
  };
}

export default async function Vote({ params: { id, bet } }: Props) {
  const betNumber = parseInt(bet);
  if (Number.isNaN(betNumber)) {
    return notFound();
  }
  const vote = await getVote(id, betNumber);

  if (!vote) {
    return notFound();
  }

  return (
    <main>
      <PageTitle>
        {vote.title} förslagspunkt {betNumber}
      </PageTitle>
      <Container>
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            current: `${vote.id} förslagspunkt ${betNumber}`,
            links: [{ href: routes.votes, title: "Voteringar" }],
          }}
          socialMediaProps={{
            title: `${vote.id} förslagspunkt ${betNumber}`,
          }}
        />
        <Card className="my-4 flex flex-col gap-2">
          <TotalVote voting={vote.voting.total} />
          <h2 className="text-xl sm:text-2xl">Utskottets förslag</h2>
          <p>{vote.propositionText}</p>
          <Divider />
          {vote.processedDocuments.length > 0 && (
            <>
              <Documents documents={vote.processedDocuments} />
              <Divider />
            </>
          )}
          <Accordion title="Röstfördelning">
            <VoteDistribution voting={vote.voting} />
          </Accordion>
          <Divider />
          <h2 className="text-xl sm:text-2xl">Beslut</h2>
          <p>{vote.decision}</p>
          <Divider />
          <h2 className="text-xl sm:text-2xl">Beslut i korthet</h2>
          <div
            dangerouslySetInnerHTML={{ __html: vote.description }}
            className="[&>p:not(:last-child)]:mb-4"
          />
          {vote.appendix && (
            <>
              <Divider />
              <h3 className="text-xl sm:text-2xl">Bilagor</h3>
              <Appendix documents={vote.appendix} />
            </>
          )}
        </Card>
        <ResponsiveAd />
      </Container>
    </main>
  );
}

export function generateMetadata({ params: { id, bet } }: Props) {
  const urlDecodedId = decodeURIComponent(id);
  return {
    title: `${urlDecodedId} förslagpunkt ${bet} | Votering | Partiguiden`,
    description: `Hur har partiernat röstat i voteringen ${urlDecodedId} förslagspunkt ${bet}`,
  };
}
