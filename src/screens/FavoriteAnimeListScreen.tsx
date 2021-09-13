import React from 'react';
import {View} from 'native-base';
import {useFavoriteAnimes} from '../providers/FavoriteAnimeProvider';
import AnimeList from '../components/AnimeList/AnimeList';

const {Card} = AnimeList;
const FavoriteAnimeListScreen = () => {
  const {favoriteAnimes, remove} = useFavoriteAnimes();

  return (
    <View p={4} flex={1}>
      <AnimeList
        data={favoriteAnimes}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({item}) => (
          <Card
            isFavorite
            anime={item}
            onRemoveFavorite={remove}
            onPress={console.log}
          />
        )}
      />
    </View>
  );
};

const ListSeparator = () => <View mb={4} />;

export default FavoriteAnimeListScreen;
