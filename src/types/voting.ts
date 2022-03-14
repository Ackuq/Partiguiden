import { DocumentAttachment } from './parliament';
import { PartyAbbreviation } from '../utils/parties';

export type VoteDescription = 'yes' | 'no' | 'refrain' | 'abscent';

export type VotingEntry = Record<VoteDescription, string>;

export type VotingGroup = PartyAbbreviation | 'noParty' | 'total';

export type VotingDict = Record<VotingGroup, VotingEntry>;

export type VotingResult = {
  yes: Array<string>;
  no: Array<string>;
  winner: 'yes' | 'no' | 'draw';
};

export interface VoteResultsResponse {
  results: VotingResult;
  subtitle: string;
}
export interface VoteListEntry extends VoteResultsResponse {
  title: string;
  authority: string;
  documentId: string;
  proposition: number;
}

export interface ProcessedDocument {
  id: string;
  label: string;
  proposals?: string;
}

export interface VoteAppendixItem {
  titel: string;
  dok_id: string;
  fil_url: string;
}

export interface VoteList {
  pages: number;
  votes: Array<VoteListEntry>;
}

export interface Vote {
  title: string;
  description: string;
  authority: string;
  propositionText: string;
  processedDocuments: Array<ProcessedDocument>;
  appendix: Array<DocumentAttachment>;
  decision: string;
  voting: VotingDict;
}
