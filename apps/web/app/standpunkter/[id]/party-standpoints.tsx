"use client";

import { BaseCard } from "@components/card";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { dateString } from "@lib/dates";
import {
  backgroundHover,
  borderBottom,
  marker,
  textColor,
} from "@lib/styles/party";
import type { Standpoint } from "@partiguiden/party-data/types";
import type { Party } from "@partiguiden/party-data/types";
import { getPartyName } from "@partiguiden/party-data/utils";
import { useState } from "react";

interface PartyStandpointsProps {
  party: Party;
  standpoints: Standpoint[];
}

export default function PartyStandpoints({
  party,
  standpoints,
}: PartyStandpointsProps) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible((prevState) => !prevState);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`${borderBottom[party]} flex w-full items-center justify-between border-b-2 py-3 pl-2 text-start text-3xl font-light`}
      >
        {getPartyName(party)}
        <ChevronUpIcon
          data-active={visible ? "true" : "false"}
          className="mr-2 h-6 w-6 transition-transform duration-300 data-[active=true]:rotate-180"
        />
      </button>

      {visible && (
        <div className="grid gap-3">
          {standpoints.map((standpoint) => (
            <BaseCard key={standpoint.url} className="grid gap-5">
              <p className="text-2xl">{standpoint.title}</p>
              {standpoint.opinions.length > 0 ? (
                <ul
                  className={`${marker[party]} grid list-inside list-disc gap-3`}
                >
                  {standpoint.opinions.map((opinion) => (
                    <li key={opinion}>{opinion}</li>
                  ))}
                </ul>
              ) : (
                <p>Inga ståndpunkter hittades</p>
              )}
              <div className="flex justify-between">
                <a
                  className={`${textColor[party]} ${backgroundHover[party]} rounded p-2 text-sm font-medium uppercase transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={standpoint.url}
                >
                  Läs mer på partiets hemsida
                </a>
                <span>Datan hämtades {dateString(standpoint.fetchDate)}</span>
              </div>
            </BaseCard>
          ))}
        </div>
      )}
    </>
  );
}
