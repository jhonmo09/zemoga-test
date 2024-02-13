import { State, Action } from '@/types';

import { useEffect, useReducer } from 'react';

const init = (initialState: State): State => {
  const dataFromStorage = localStorage.getItem('cardVotes');
  return dataFromStorage ? JSON.parse(dataFromStorage) : initialState;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT_POSITIVE':
      return state.map((card) =>
        card.name === action.name ? { ...card, votes: { ...card.votes, positive: card.votes.positive + 1 } } : card
      );
    case 'INCREMENT_NEGATIVE':
      return state.map((card) =>
        card.name === action.name ? { ...card, votes: { ...card.votes, negative: card.votes.negative + 1 } } : card
      );
    case 'INITIALIZE':
      return action.data;
    default:
      return state;
  }
};

const useCardVotes = (data: State) => {
  const [state, dispatch] = useReducer(reducer, data, init);

  useEffect(() => {
    const savedData = localStorage.getItem('cardVotes');
    if (savedData) {
      dispatch({ type: 'INITIALIZE', data: JSON.parse(savedData) });
    } else {
      dispatch({ type: 'INITIALIZE', data });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cardVotes', JSON.stringify(state));
  }, [state]);

  const incrementPositive = (name: string) => dispatch({ type: 'INCREMENT_POSITIVE', name });
  const incrementNegative = (name: string) => dispatch({ type: 'INCREMENT_NEGATIVE', name });

  return { state, incrementPositive, incrementNegative, dispatch };
};

export default useCardVotes;
