import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import membersWithAbsenceController from "@lib/api/member/get-members-with-absence";
import { createMemberAbsenceLeaderboard } from "@lib/api/member/utils/absence-leaderboard";
import AbsenceLeaderboard from "../absence-leaderboard";
import { AbsencePeriod } from "@lib/api/member/types";
import MemberNavigation from "@app/ledamot/member-navigation";
import { getCurrentMandatePeriod } from "@lib/api/parliament/get-current-mandate-period";

export const metadata = {
  title: "Ledamotstatistik mandatperiod | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MemberStatisticsParliamentYear() {
  const latestMandatePeriod = await getCurrentMandatePeriod();
  const membersMandatePeriod = await membersWithAbsenceController({
    parliamentYears: latestMandatePeriod.parliamentYears,
  });
  const absenceLeaderboard = createMemberAbsenceLeaderboard(
    membersMandatePeriod,
    10,
  );

  return (
    <main>
      <PageTitle className="mb-0" Icon={UserCircleIcon}>
        Riksdagsledamöter
      </PageTitle>
      <MemberNavigation value={2} />
      <Container>
        <AbsenceLeaderboard
          leaderboard={absenceLeaderboard}
          period={AbsencePeriod.parliamentYear}
          description={latestMandatePeriod.period}
        />
      </Container>
    </main>
  );
}
