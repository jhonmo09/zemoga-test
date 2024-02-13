export interface Vote {
  positive: number;
  negative: number;
}

export interface CardData {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: Vote;
}

export interface CardProps {
  incrementPositive: (name: string) => void;
  incrementNegative: (name: string) => void;
  displayType: 'grid' | 'list';
  data: CardData;
}

export type State = CardData[];

export type Action =
  | { type: 'INCREMENT_POSITIVE'; name: string }
  | { type: 'INCREMENT_NEGATIVE'; name: string }
  | { type: 'INITIALIZE'; data: State };

export type ScreenSize = {
  width: number;
  height: number;
};
