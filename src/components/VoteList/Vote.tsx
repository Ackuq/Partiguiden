import React from 'react';
import Link from 'next/link';

import { darken, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './useStyles';
import { lookupAuthority } from '../../utils';
import VoteResult from './VoteResult';
import { VoteListEntry } from '../../types/voting';

import * as ROUTES from '../../lib/routes';

interface Props {
  vote: VoteListEntry;
  classes: ReturnType<typeof useStyles>;
}

const Vote: React.FC<Props> = ({ vote, classes }) => {
  const theme = useTheme();
  const authority = lookupAuthority(vote.authority);

  return (
    <Card elevation={1} style={{ flex: 1 }}>
      <Link href={ROUTES.VOTE} as={ROUTES.getVoteHref(vote.documentId, vote.proposition)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          <CardHeader
            title={authority.desc}
            style={{
              background:
                theme.palette.type === 'dark' ? darken(authority.color, 0.6) : authority.color,
            }}
            classes={{
              title: classes.headerTitle,
              root: classes.headerRoot,
            }}
          />
          <CardContent>
            <Typography variant="h3" align="left" gutterBottom classes={{ h3: classes.title }}>
              {vote.title}
            </Typography>
            <Typography variant="h6" align="left" classes={{ h6: classes.subtitle }}>
              {vote.subtitle}
            </Typography>
          </CardContent>

          <VoteResult votes={vote.results} classes={classes} />
        </ButtonBase>
      </Link>
    </Card>
  );
};

export default Vote;
