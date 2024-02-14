import { State, Action, CardData } from '@/types';

import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useFetchLocalJson } from '.';

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

const useCardVotes = () => {
  const { data } = useFetchLocalJson('/data/data.json');

  // Inicialización del estado desde localStorage si está disponible,
  // de lo contrario, usamos un estado vacío y esperamos la carga de datos.
  const init = (): State => {
    const dataFromStorage = localStorage.getItem('cardVotes');
    return dataFromStorage ? JSON.parse(dataFromStorage) : [];
  };

  const [state, dispatch] = useReducer(reducer, [], init);

  // Efecto para inicializar el estado con los datos de la API si localStorage está vacío.
  useEffect(() => {
    if (data && !localStorage.getItem('cardVotes')) {
      dispatch({ type: 'INITIALIZE', data: data.data });
    }
  }, [data]);

  // Efecto para guardar el estado en localStorage cada vez que cambia.
  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem('cardVotes', JSON.stringify(state));
    }
  }, [state]);

  const incrementPositive = (name: string) => {
    dispatch({ type: 'INCREMENT_POSITIVE', name });
  };

  const incrementNegative = (name: string) => {
    dispatch({ type: 'INCREMENT_NEGATIVE', name });
  };

  return { state, incrementPositive, incrementNegative };
};

export default useCardVotes;
