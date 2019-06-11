import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import Subject from '../components/Views/Subject';
import getData from '../components/Views/Subject/lib/getSubjectData';
import { useStateValue } from '../lib/stateProvider';

const SubjectContainer = ({ router }) => {
  const { id } = router.query;
  const { subjectData } = useStateValue()[0];

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState(null);

  useEffect(() => {
    subjectData.then(data => {
      const subject = data.find(el => el.id === id);
      setName(subject.name);
      getData(subject.opinions).then(opinionData => {
        const filtered = opinionData.filter(party => party !== undefined);
        setPartyData(filtered);
        setLoading(false);
      });
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{name} | Partiguiden.nu</title>
        <meta
          name="description"
          content={`Vad tar Sveriges partier för ståndpunkter inom ämnet ${name} Här hittar du informationen du behöver för att kunna jämföra och hitta det parti du sympatiserar med mest! `}
        />
      </Head>
      <div className="list-title text-center">
        <h1>{name}</h1>
      </div>
      <main className="container">
        <Subject partyData={partyData} loading={loading} />
      </main>
    </React.Fragment>
  );
};

export default withRouter(SubjectContainer);
