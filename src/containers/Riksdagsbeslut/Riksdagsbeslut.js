import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withRouter } from 'next/router';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/Filter';
import { FilterProvider } from '../../components/FilterContainer';
import RiksdagsbeslutList from './components/RiksdagsbeslutList';

const Riksdagsbeslut = ({ router }) => {
  let initialOrg = [];
  if (router.query.org) {
    initialOrg = Array.isArray(router.query.org) ? router.query.org : [router.query.org];
  }
  return (
    <FilterProvider
      initialState={{
        org: initialOrg,
        search: router.query.sok || ''
      }}
      reducer={reducer}
    >
      <Box display="flex">
        <Container>
          <RiksdagsbeslutList />
        </Container>
        <Filter />
      </Box>
    </FilterProvider>
  );
};

Riksdagsbeslut.propTypes = {
  router: object.isRequired
};

export default withRouter(Riksdagsbeslut);
