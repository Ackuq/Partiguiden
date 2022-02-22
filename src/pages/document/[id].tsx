import React from 'react';
import { NextPage, GetServerSideProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import Container from '@mui/material/Container';

import PageTitle from '../../components/PageTitle';
import SocialMediaShare from '../../components/BreadcrumbsSocialMediaShare/SocialMediaShare';
import Document from '../../containers/Document';
import { useDocument } from '../../hooks/parliamentHooks';
import LoadCircle from '../../components/LoadCircle';

const DocumentContainer: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  id,
}) => {
  const document = useDocument(id);

  return (
    <>
      <Head>
        <title>{id} | Dokument | Partiguiden</title>
      </Head>
      <PageTitle title={`Dokument ${id}`} />
      <Container>
        <SocialMediaShare title={`Dokument ${id}`} />
        {document ? <Document body={document.html} /> : <LoadCircle />}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ id: string }, { id: string }> = async ({
  params,
}) => {
  const id = params?.id;

  if (id === undefined) {
    return { notFound: true };
  }

  return { props: { id } };
};

export default DocumentContainer;
