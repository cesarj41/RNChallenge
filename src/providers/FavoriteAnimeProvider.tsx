import React from 'react';
import {Anime} from '../@types';

type ProviderState = {
  favoriteAnimes: Anime[];
  add: (anime: Anime) => void;
  remove: (id: string) => void;
};

const FavoriteAnimeContext = React.createContext<ProviderState | undefined>(
  undefined,
);

type State = Pick<ProviderState, 'favoriteAnimes'>;
class FavoriteAnimeProvider extends React.Component<{}, State> {
  state = {
    favoriteAnimes: [],
  };

  add = (anime: Anime) => {
    this.setState(current => ({
      favoriteAnimes: [...current.favoriteAnimes, anime],
    }));
  };

  remove = (id: string) => {
    this.setState(current => ({
      favoriteAnimes: current.favoriteAnimes.filter(anime => anime.id !== id),
    }));
  };

  render() {
    return (
      <FavoriteAnimeContext.Provider
        value={{
          favoriteAnimes: this.state.favoriteAnimes,
          add: this.add,
          remove: this.remove,
        }}>
        {this.props.children}
      </FavoriteAnimeContext.Provider>
    );
  }
}

const useFavoriteAnimes = () => {
  const context = React.useContext(FavoriteAnimeContext);

  if (!context) {
    throw new Error(
      'useFavoriteAnimes must be used within a FavoriteAnimeContext',
    );
  }

  return context;
};

export {FavoriteAnimeProvider, useFavoriteAnimes};
