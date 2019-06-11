import React from 'react';
import Head from 'next/head';

import Voteringar from '../components/Views/Voteringar';

const VoteringarContainer = () => (
  <React.Fragment>
    <Head>
      <title>Voteringar | Partiguiden.nu</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <div className="list-title text-center">
      <h1>Voteringar</h1>
    </div>
    <main>
      <Voteringar />
    </main>
  </React.Fragment>
);

export default VoteringarContainer;
