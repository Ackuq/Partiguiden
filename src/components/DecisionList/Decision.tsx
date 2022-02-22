import React, { useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import Collapse from '@mui/material/Collapse';

import { darken, styled } from '@mui/material/styles';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { lookupAuthority } from '../../utils/authorityTable';
import { Decision as DecisionType } from '../../types/decision';

import * as ROUTES from '../../lib/routes';

const CardContainer = styled('div')(
  ({ theme }) => `
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.background.paper};
    overflow: hidden;
    box-shadow: ${theme.shadows[1]};
`
);

const CustomCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const Title = styled(Typography)`
  font-size: 1.125rem;
  line-height: 1.3;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark};
`;

const Subtitle = styled(Typography)`
  font-size: 1rem;
  line-height: 1.25;
`;

const Arrow = styled(ArrowDownIcon)<{ active: 'true' | 'false' }>`
  transition: transform 0.25s ease-in-out;
  font-size: 2rem;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark};
  transform: rotate(${({ active }) => (active === 'true' ? '180deg' : '0')});
`;

const Header = styled('div', { shouldForwardProp: (props) => props !== 'authorityColor' })<{
  authorityColor: string;
}>`
  background-color: ${({ theme, authorityColor }) =>
    theme.palette.mode === 'dark' ? darken(authorityColor, 0.6) : authorityColor};
  width: 100%;
  text-align: left;
  padding: 0.25rem 1rem;
`;

const HeaderTitle = styled('span')`
  font-size: 1.15rem;
  color: #ffffff;
`;

const CardButton = styled(ButtonBase)`
  display: block;
  width: 100%;
`;

interface Props {
  decision: DecisionType;
}

const Decision: React.FC<Props> = ({ decision }) => {
  const [visible, setVisible] = useState(false);
  const authority = lookupAuthority(decision.authority);

  return (
    <>
      {authority && (
        <CardContainer>
          <CardButton onClick={() => setVisible(!visible)}>
            <Header authorityColor={authority.color}>
              <HeaderTitle>{authority.desc}</HeaderTitle>
            </Header>

            <CustomCardContent>
              <div>
                <Title align="left" gutterBottom>
                  {decision.paragraphTitle}
                </Title>
                <Subtitle color="textSecondary" align="left">
                  {decision.title}
                </Subtitle>
              </div>
              <Arrow active={visible.toString() as 'true' | 'false'} />
            </CustomCardContent>
          </CardButton>

          <CardContent>
            <Collapse in={visible}>
              <div className="paragraph">
                {decision.paragraph && (
                  <div dangerouslySetInnerHTML={{ __html: decision.paragraph }} />
                )}
              </div>
              <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(decision.id)} passHref>
                <Button component="a">Läs mer om betänkandet</Button>
              </Link>
              {decision.votesExists && (
                <Link href={`${ROUTES.VOTES}?search=${decision.voteSearchTerm}`} passHref>
                  <Button component="a">Läs mer om voteringarna</Button>
                </Link>
              )}
            </Collapse>
          </CardContent>
        </CardContainer>
      )}
    </>
  );
};

export default Decision;
