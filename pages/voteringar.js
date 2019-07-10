import React from 'react';
import Head from 'next/head';
import VoteIcon from '@material-ui/icons/HowToVoteRounded';

import PageTitle from '../src/components/PageTitle';
import Voteringar from '../src/containers/Voteringar';

const VoteringarContainer = () => (
  <React.Fragment>
    <Head>
      <title>Voteringar | Partiguiden.nu</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <PageTitle title="Voteringar" Icon={VoteIcon} />
    <Voteringar />
  </React.Fragment>
);

export default VoteringarContainer;
