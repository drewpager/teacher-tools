import React from 'react';
import { useAllPlaylistsQuery, Viewer } from '../../../graphql/generated';
import { PublicPlaylistCard } from '../PublicPlaylistCard';
import './cardCarousel.scss';

type Props = {
  viewer: Viewer
}

export const CardCarousel = ({ viewer }: Props) => {

  const { data, loading, error } = useAllPlaylistsQuery({
    variables: {
      limit: 30,
      page: 2,
    }
  });

  if (loading) {
    console.log("Loading");
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="card-carousel">
      {data?.allplaylists.result.map((card, index) => (
        card.public && (
          <div key={card.id} className="card-container">
            <div className="moving-card">
              <PublicPlaylistCard
                {...card}
                premium={card.premium ? card.premium : false}
                viewer={viewer}
              />
            </div>
          </div>
        )
      ))}
    </div>
  )
}