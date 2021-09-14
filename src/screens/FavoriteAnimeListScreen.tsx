import React from 'react';
import {View} from 'native-base';
import {useFavoriteAnimes} from '../providers/FavoriteAnimeProvider';
import AnimeList from '../components/AnimeList/AnimeList';
import {Anime, Screens} from '../@types';

type Props = Screens<'FavoriteAnimeListScreen'>;

const {Card} = AnimeList;
const FavoriteAnimeListScreen = ({navigation: {navigate}}: Props) => {
  const {favoriteAnimes, remove} = useFavoriteAnimes();
  const handleNavigationToDetail = (anime: Anime) => {
    navigate('AnimeDetailScreen', {anime});
  };
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
            onPress={handleNavigationToDetail}
          />
        )}
      />
    </View>
  );
};

const ListSeparator = () => <View mb={4} />;

export default FavoriteAnimeListScreen;
