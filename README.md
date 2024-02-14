# Project Next.js Documentation

## Introduction

This project is a web application developed using Next.js, a popular framework based on React. It is designed for conducting a technical test and demonstrates the use of custom hooks, local storage, and state management in a React application.

## Project Structure

The project follows the typical structure of a Next.js application:

- `app/`: Contains the application pages.
- `components/`: Includes the React components used in the application.
- `hooks/`: Houses custom hooks, including useCardVotes.
- `types`: Defines the types and interfaces used throughout the application.
- `styles/`: Contains CSS style files.
- `__tests__`: Cointains some unit tests.

## Custom Hook: useCardVotes

### Purpose

The `useCardVotes` hook manages card votes in the application. It maintains the state of votes and synchronizes this state with the browser's `localStorage` to persist data between sessions.

### Functionality

- **Initialization:** Upon loading the application, the hook attempts to retrieve the vote state from `localStorage`. If no data is available, it initializes with a default state obtained through the `useFetchLocalJson` hook.
- **Vote Increment:** Provides functions to increment positive and negative votes for each card.
- **Data Persistence:** Changes in the vote state are automatically saved in `localStorage` to maintain persistence.

### Code

```javascript
const useCardVotes = () => {
  const { data } = useFetchLocalJson('/data/data.json');

  // State initialization from localStorage if available,
  // otherwise we use an empty state and wait for data to load.
  const init = (): State => {
    const dataFromStorage = localStorage.getItem('cardVotes');
    return dataFromStorage ? JSON.parse(dataFromStorage) : [];
  };

  const [state, dispatch] = useReducer(reducer, [], init);

  // Effect to initialize state with API data if localStorage is empty.
  useEffect(() => {
    if (data && !localStorage.getItem('cardVotes')) {
      dispatch({ type: 'INITIALIZE', data: data.data });
    }
  }, [data]);

  // Effect to save state to localStorage every time it changes.
  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem('cardVotes', JSON.stringify(state));
    }
  }, [state]);

  //Add positive or negative votes to the card in the stored data.
  const incrementPositive = (name: string) => {
    dispatch({ type: 'INCREMENT_POSITIVE', name });
  };

  const incrementNegative = (name: string) => {
    dispatch({ type: 'INCREMENT_NEGATIVE', name });
  };

  return { state, incrementPositive, incrementNegative };
};
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
