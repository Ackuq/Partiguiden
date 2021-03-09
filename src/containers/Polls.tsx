import { styled, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DefaultTooltipContent } from '../types/recharts.d';
import PartySymbolTick from '../components/PartySymbolTick';
import { getAverage, getWithin } from '../lib/polls';
import { partyAbbrev } from '../types/party';
import { Polls as PollsType } from '../types/polls';
import { partiesMap } from '../utils/getParties';

interface Props {
  polls: PollsType;
}

const today = new Date();

const ChartContainer = styled(ResponsiveContainer)({
  marginTop: '1rem',
  marginLeft: '-20px',
});

interface BarrierLabelProps {
  offset?: number;
  viewBox?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

const BarrierLabel: React.FC<BarrierLabelProps> = ({
  offset = 0,
  viewBox = { x: 0, y: 0, width: 0 },
}) => {
  const width = 70;
  const height = 25;

  const x = viewBox.width / 2 + viewBox.x;
  const y = viewBox.y;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        offset={offset}
        rx="5"
        ry="5"
        width={width}
        height={height}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize={11}>
        4% spärren
      </text>
    </g>
  );
};

interface ToolTipProps {
  payload?: Array<{ name: string; payload?: unknown }>;
}

const CustomToolTip: React.FC<ToolTipProps> = ({ ...props }) => {
  if (props.payload && props.payload[0]) {
    console.log(props);
    const details = (props.payload[0].payload as { details: Array<[number, string]> }).details.map(
      (el) => ({
        name: el[1],
        value: el[0],
      })
    );

    props.payload = [...props.payload, ...details];
  }
  return <DefaultTooltipContent {...props} />;
};

const Polls: React.FC<Props> = ({ polls }) => {
  const shortScreen = useMediaQuery('(max-height:1000px)');

  const [barChart, setBarChart] = useState<
    Array<{ name: string; value: number; details: Array<[number, string]> }>
  >();

  useEffect(() => {
    const average = getAverage(getWithin(polls, today, today));
    const barChartData = Object.keys(average).map((party) => ({
      name: party,
      value: average[party as partyAbbrev][0],
      details: average[party as partyAbbrev][1],
    }));
    setBarChart(barChartData);
  }, []);

  return (
    <ChartContainer height={shortScreen ? 300 : 500}>
      <BarChart data={barChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" dataKey="name" tick={<PartySymbolTick />} tickLine={false} />
        <YAxis
          type="number"
          domain={[0, Math.max.apply(Math, barChart?.map((el) => el.value) || []) + 2]}
        />
        <Tooltip content={<CustomToolTip />} />
        <Bar dataKey="value" name="Genomsnitt" legendType="none">
          {barChart?.map((el) => (
            <Cell key={el.name} fill={partiesMap[el.name as partyAbbrev].color} />
          ))}
        </Bar>
        <ReferenceLine
          y={4}
          stroke="black"
          strokeWidth={2}
          label={<BarrierLabel />}
          textAnchor="middle"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default Polls;
