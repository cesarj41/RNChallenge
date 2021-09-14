import React from 'react';
import {View} from 'native-base';
import {useFavoriteAnimes} from '../providers/FavoriteAnimeProvider';
import AnimeList from '../components/AnimeList/AnimeList';

const FavoriteAnimeListScreen = () => {
  const {favoriteAnimes} = useFavoriteAnimes();
  return (
    <View p={4} flex={1}>
      <AnimeList animes={favoriteAnimes} />
    </View>
  );
};

export default FavoriteAnimeListScreen;
