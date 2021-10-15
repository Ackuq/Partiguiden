import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import GavelIcon from '@mui/icons-material/GavelRounded';
import GroupIcon from '@mui/icons-material/Group';
import HowToVoteIcon from '@mui/icons-material/HowToVoteRounded';
import InfoIcon from '@mui/icons-material/InfoRounded';
import PersonIcon from '@mui/icons-material/Person';
import PollIcon from '@mui/icons-material/Poll';

import Image from 'next/image';
import parties from '../../utils/getParties';
import * as ROUTES from '../../lib/routes';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';

const partyFactory = (partyAbbrev: string) =>
  function PartyIcon() {
    return (
      <Image
        src={PARTY_LOGOS_LOW_RES[partyAbbrev.toUpperCase() as PartyAbbreviation]}
        layout="fixed"
        width="30%"
        height="30%"
        quality={100}
        alt={`${partyAbbrev} logo`}
      />
    );
  };

const PAGES = [
  { href: ROUTES.INDEX, title: 'Hem', Icon: HomeIcon },
  {
    href: ROUTES.STANDPOINTS,
    title: 'Partiernas Ståndpunkter',
    Icon: NoteIcon,
    associated: [ROUTES.STANDPOINT],
  },
  {
    href: ROUTES.PARTY,
    title: 'Partierna',
    subPages: parties.map((party) => ({
      title: party.name,
      id: party.letter.toLocaleLowerCase(),
      Icon: partyFactory(party.letter.toUpperCase()),
    })),
    Icon: GroupIcon,
  },
  { href: ROUTES.DECISIONS, title: 'Riksdagsbeslut', Icon: GavelIcon },
  { href: ROUTES.VOTES, title: 'Voteringar', Icon: HowToVoteIcon, associated: [ROUTES.VOTE] },
  { href: ROUTES.MEMBERS, title: 'Ledamöter', Icon: PersonIcon, associated: [ROUTES.MEMBER] },
  {
    href: ROUTES.POLLS,
    title: 'Opinionsundersökningar',
    Icon: PollIcon,
    associated: [],
  },
  { href: ROUTES.ABOUT_US, title: 'Om oss', Icon: InfoIcon },
];

export default PAGES;
