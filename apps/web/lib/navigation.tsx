import PartyIcon from "@components/party/icon";
import {
  HomeIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ChartBarIcon,
  InformationCircleIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon,
} from "@heroicons/react/24/solid";
import { Party } from "@partiguiden/party-data/types";
import { getPartyName } from "@partiguiden/party-data/utils";

export const routes = {
  index: "/",
  cookiePolicy: "/cookie-policy",
  aboutUs: "/om-oss",
  polls: "/polls",
  votes: "/voteringar",
  vote: "/vote/[id]/[bet]",
  decisions: "/decisions",
  standpoints: "/standpunkter",
  standpoint(id: string) {
    return `/standpunkter/${id}`;
  },
  party(party: Party) {
    return `/parti/${party}`;
  },
  members: "/member",
  member(id: string) {
    return `/ledamot/${id}`;
  },
  memberStatsYear: "/member-stats/year",
  memberStatsPeriod: "/member-stats/period",
  document: "/document/[id]",
  debates: "/debate",
  debate: "/debate/[id]",
};

export interface RouteEntry {
  href: string;
  title: string;
  Icon?: React.ElementType;
}

export type NavigationEntry =
  | RouteEntry
  | { title: string; subPages: RouteEntry[] };

export const mainNavigation: NavigationEntry[] = [
  { href: routes.index, title: "Hem", Icon: HomeIcon },
  {
    href: routes.standpoints,
    title: "Partiernas Ståndpunkter",
    Icon: PencilSquareIcon,
  },
  {
    title: "Partierna",
    subPages: Object.values(Party).map((party) => ({
      title: getPartyName(party),
      href: routes.party(party),
      Icon: () => <PartyIcon party={party} />,
    })),
  },
  { href: routes.decisions, title: "Riksdagsbeslut", Icon: DocumentCheckIcon },
  {
    href: routes.votes,
    title: "Voteringar",
    Icon: ScaleIcon,
  },
  {
    href: routes.debates,
    title: "Debatter",
    Icon: ChatBubbleLeftRightIcon,
  },
  {
    href: routes.members,
    title: "Ledamöter",
    Icon: UserCircleIcon,
  },
  {
    href: routes.polls,
    title: "Opinionsundersökningar",
    Icon: ChartBarIcon,
  },
  { href: routes.aboutUs, title: "Om oss", Icon: InformationCircleIcon },
];
