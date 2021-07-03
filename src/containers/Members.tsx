import React, { useState } from 'react';

import { Grid, Container } from '@material-ui/core';

import { MembersFilter, MemberList } from '../components/MemberList';

import { MemberList as MemberListType } from '../types/member';
import { PartyAbbreviation } from '../utils/parties';

interface Props {
  members: MemberListType;
}

interface FilterState {
  search: string;
  parties: Array<PartyAbbreviation>;
}

const Members: React.FC<Props> = ({ members }) => {
  const [filter, setFilter] = useState<FilterState>({ search: '', parties: [] });

  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <Grid container spacing={3} justify="center">
          <MemberList members={members} filter={filter} />
        </Grid>
      </Container>
      <MembersFilter state={filter} setState={setFilter} />
    </div>
  );
};

export default Members;
