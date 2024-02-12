import * as React from 'react';
import Image from 'next/image';

import { formatDistanceToNow } from 'date-fns';

type CardProps = {
  data: {
    name: string;
    description: string;
    category: string;
    picture: string;
    lastUpdated: string;
    votes: {
      positive: number;
      negative: number;
    };
  };
  displayType: 'list' | 'grid';
};
const Card = (props: CardProps) => {
  const { data, displayType } = props;

  const [positiveVotes, setPositiveVotes] = React.useState<number>(data.votes.positive);
  const [negativeVotes, setNegativeVotes] = React.useState<number>(data.votes.negative);
  const [isVoteNowDisabled, setIsVoteNowDisabled] = React.useState<boolean>(true);
  const [selectedThumb, setSelectedThumb] = React.useState<string | null>(null);
  const [userHasVoted, setUserHasVoted] = React.useState<boolean>(false);

  const totalVotes = positiveVotes + negativeVotes;
  const formattedData = formatDistanceToNow(new Date(data.lastUpdated), { addSuffix: true });

  const getPercentage = (num: number) => {
    const percentage = Math.round((100 / totalVotes) * num * 10) / 10;
    return percentage;
  };

  const handleSelectedThumb = (value: string) => {
    setSelectedThumb(value);
    setIsVoteNowDisabled(false);
  };

  const handleVote = () => {
    if (userHasVoted) {
      setUserHasVoted(false);
      setSelectedThumb(null);
    } else {
      setUserHasVoted(true);
      if (selectedThumb === 'positive') {
        setPositiveVotes(positiveVotes + 1);
      }

      if (selectedThumb === 'negative') {
        setNegativeVotes(negativeVotes + 1);
      }
    }
  };

  const goodRating = getPercentage(positiveVotes);
  const badRating = getPercentage(negativeVotes);

  return (
    <article className={`card card--${displayType}`}>
      <Image src={`/img/${data.picture}`} alt={data.name} width={300} height={300} />
      <div className="card__inner">
        <div className="card__content">
          <div className="card__title">
            <div className={`thumbs thumbs--${goodRating > 50 ? 'up' : 'down'}`}>
              <Image
                width={16}
                height={16}
                src={`/img/${goodRating > 50 ? 'thumbs-up.svg' : 'thumbs-down.svg'}`}
                alt="thumbs"
              />
            </div>
            <h3>{data.name}</h3>
          </div>

          <div className="card__description">
            <p>{data.description}</p>
          </div>
        </div>

        <div className="card__footer">
          <div className="card__date">
            {userHasVoted ? 'Thank you for your vote!' : `${formattedData} in ${data.category}`}
          </div>
          <div className="card__actions">
            {!userHasVoted && (
              <>
                <button
                  className={`thumbs-vote thumbs--up thumbs ${selectedThumb === 'positive' && 'selected'}`}
                  onClick={() => handleSelectedThumb('positive')}
                >
                  <Image width={16} height={16} src="/img/thumbs-up.svg" alt="thumbs up" />
                </button>
                <button
                  className={`thumbs-vote thumbs--down thumbs ${selectedThumb === 'negative' && 'selected'}`}
                  onClick={() => handleSelectedThumb('negative')}
                >
                  <Image width={16} height={16} src="/img/thumbs-down.svg" alt="thumbs down" />
                </button>
              </>
            )}

            <button className="vote-button" disabled={isVoteNowDisabled} onClick={handleVote}>
              {userHasVoted ? 'Vote Again' : 'Vote now'}
            </button>
          </div>
        </div>

        <div className="card-bar">
          <div className="card-bar__positive" style={{ width: `${goodRating}%` }}>
            <Image width={16} height={16} src="/img/thumbs-up.svg" alt="thumbs up" />
            <span>{goodRating}%</span>
          </div>

          <div className="card-bar__negative" style={{ width: `${badRating}%` }}>
            <Image width={16} height={16} src="/img/thumbs-down.svg" alt="thumbs down" />
            <span>{badRating}%</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
