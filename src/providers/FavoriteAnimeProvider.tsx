import React from 'react';
import {Anime} from '../@types';

type ProviderState = {
  animes: Anime[];
};

type ProviderActionState = {
  add: (anime: Anime) => void;
  remove: (id: string) => void;
};

const FavoriteAnimeContext = React.createContext<ProviderState | undefined>(
  undefined,
);

const FavoriteAnimeActionContext = React.createContext<
  ProviderActionState | undefined
>(undefined);

type State = Pick<ProviderState, 'animes'>;
class FavoriteAnimeProvider extends React.Component<{}, State> {
  state = {
    animes: [],
  };

  add = (anime: Anime) => {
    this.setState(current => ({animes: [...current.animes, anime]}));
  };

  remove = (id: string) => {
    this.setState(current => ({
      animes: current.animes.filter(anime => anime.id !== id),
    }));
  };

  render() {
    return (
      <FavoriteAnimeActionContext.Provider
        value={{add: this.add, remove: this.remove}}>
        <FavoriteAnimeContext.Provider
          value={{
            animes: this.state.animes,
          }}>
          {this.props.children}
        </FavoriteAnimeContext.Provider>
      </FavoriteAnimeActionContext.Provider>
    );
  }
}

const useFavoriteAnime = () => {
  const context = React.useContext(FavoriteAnimeContext);
  const actionContext = React.useContext(FavoriteAnimeActionContext);

  if (!context || !actionContext) {
    throw new Error(
      'useFavoriteAnime must be used within a FavoriteAnimeContext and FavoriteAnimeActionContext',
    );
  }

  return {
    animes: context.animes,
    add: actionContext.add,
    remove: actionContext.remove,
  };
};

const useFavoriteAnimeActions = () => {
  const context = React.useContext(FavoriteAnimeActionContext);

  if (!context) {
    throw new Error(
      'useFavoriteAnimeActions must be used within a FavoriteAnimeContext and FavoriteAnimeActionContext',
    );
  }

  return context;
};

export {FavoriteAnimeProvider, useFavoriteAnime, useFavoriteAnimeActions};
