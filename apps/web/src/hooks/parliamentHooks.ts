import type { DebateEntry, DebateListResponse } from "../types/debate";
import type { Decisions } from "../types/decision";
import type { DocumentResponse } from "../types/document";
import type { MemberDetailedResponse, MemberDocuments } from "../types/member";
import type { ParsedUrlQuery } from "querystring";
import { stringify } from "querystring";
import type { Vote, VoteList } from "../types/voting";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useDecisions = (query: ParsedUrlQuery): Decisions | undefined => {
  const parsedQuery = query;
  if (!parsedQuery.page) {
    parsedQuery.page = "1";
  }
  const { data } = useSWR<Decisions>(
    `/api/decisions?${stringify(parsedQuery)}`,
    fetcher,
  );
  return data;
};

export const useDebates = (
  query: ParsedUrlQuery,
): DebateListResponse | undefined => {
  const parsedQuery = query;
  if (!parsedQuery.page) {
    parsedQuery.page = "1";
  }
  const { data } = useSWR<DebateListResponse>(
    `/api/debate?${stringify(parsedQuery)}`,
    fetcher,
  );
  return data;
};

export const useDebate = (id: string): DebateEntry | undefined => {
  const { data } = useSWR<DebateEntry>(`/api/debate/${id}`, fetcher);
  return data;
};

export const useMember = (id: string): MemberDetailedResponse | undefined => {
  const { data } = useSWR<MemberDetailedResponse>(`/api/member/${id}`, fetcher);
  return data;
};

export const useVote = (id: string, proposition: number): Vote | undefined => {
  const { data } = useSWR<Vote>(`/api/vote/${id}/${proposition}`, fetcher);
  return data;
};

export const useVotes = (query: ParsedUrlQuery): VoteList | undefined => {
  const parsedQuery = query;
  if (!parsedQuery.page) {
    parsedQuery.page = "1";
  }
  const { data } = useSWR<VoteList>(
    `/api/vote?${stringify(parsedQuery)}`,
    fetcher,
  );
  return data;
};

export const useMemberDocuments = (
  id: string,
  page: number,
): MemberDocuments | undefined => {
  const { data } = useSWR<MemberDocuments>(
    `/api/member/${id}/documents?page=${page}`,
    fetcher,
  );
  return data;
};

export const useDocument = (id: string): DocumentResponse | undefined => {
  const { data } = useSWR<DocumentResponse>(
    `/api/document/${id}/json`,
    fetcher,
  );
  return data;
};