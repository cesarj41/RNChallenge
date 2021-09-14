import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'native-base';
import {Anime} from '../../@types';
import PaginatedFlatList from '../PaginatedFlatList';
import AnimeCard from './AnimeCard';
import {getAnimeListAsync} from '../../services/anime-service';
import {useFavoriteAnimes} from '../../providers/FavoriteAnimeProvider';
import {useNavigation} from '@react-navigation/core';
import {FlatList} from 'react-native';

type Props = {
  animes?: Anime[];
  filter?: string;
};

let refresh: () => void;

const AnimeList = ({filter, animes}: Props) => {
  const [mounted, setMounted] = useState(false);
  const {favoriteAnimes, add, remove} = useFavoriteAnimes();
  const {navigate} = useNavigation();
  const getData = useCallback(
    (page: number) => {
      return getAnimeListAsync(page, filter);
    },
    [filter],
  );
  const handleNavigationToDetails = useCallback(
    (anime: Anime) => {
      navigate('AnimeDetailScreen', {anime});
    },
    [navigate],
  );

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    refresh();
  }, [filter]);

  if (animes) {
    return (
      <FlatList<Anime>
        data={animes}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({item}) => (
          <AnimeCard
            anime={item}
            isFavorite
            onRemoveFavorite={remove}
            onPress={handleNavigationToDetails}
          />
        )}
      />
    );
  }
  return (
    <PaginatedFlatList
      attachRefresh={func => {
        refresh = func;
      }}
      incrementBy={10}
      getData={getData}
      ItemSeparatorComponent={ListSeparator}
      renderItem={({item}) => (
        <AnimeCard
          anime={item}
          isFavorite={favoriteAnimes.some(a => a.id === item.id)}
          onAddFavorite={add}
          onRemoveFavorite={remove}
          onPress={handleNavigationToDetails}
        />
      )}
    />
  );
};

const ListSeparator = () => <View mb={4} />;

export default AnimeList;
