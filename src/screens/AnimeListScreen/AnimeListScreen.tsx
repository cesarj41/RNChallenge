import React from 'react';
import {Input, View, Button, Spinner} from 'native-base';
import {
  getAnimeListAsync,
  searchAnimeAsync,
} from '../../services/anime-service';
import PaginatedFlatList from '../../components/PaginatedFlatList';
import AnimeCard from './AnimeCard';
import AnimeSearchList from './AnimeList';
import {Anime} from '../../@types';
import {
  useFavoriteAnimeActions,
  useFavoriteAnime,
} from '../../providers/FavoriteAnimeProvider';

const AnimeListScreen = () => {
  const favorite = useFavoriteAnime();
  const {add, remove} = useFavoriteAnimeActions();
  const [searchStatus, setStatus] = React.useState<
    'clear' | 'searching' | 'search-completed'
  >();
  const [animes, setAnimes] = React.useState<Anime[]>([]);
  const [search, setSearch] = React.useState('');
  const handleTextChange = (value: string) => {
    if (searchStatus === 'search-completed' && value.length <= 0) {
      setStatus('clear');
    }

    setSearch(value);
  };
  const handleSearch = async () => {
    if (searchStatus === 'searching') {
      return;
    }
    setStatus('searching');
    const animesFound = await searchAnimeAsync(search);
    setAnimes(animesFound);
    setStatus('search-completed');
  };
  return (
    <View p={4}>
      <Input
        value={search}
        onChangeText={handleTextChange}
        onSubmitEditing={() => console.log('presione eso')}
        bgColor="white"
        variant="rounded"
        _light={{
          placeholderTextColor: 'blueGray.400',
        }}
        _dark={{
          placeholderTextColor: 'blueGray.50',
        }}
        InputLeftElement={
          <Button
            colorScheme="secondary"
            _text={{fontSize: 'xs'}}
            onPress={handleSearch}>
            Search
          </Button>
        }
        InputRightElement={
          searchStatus === 'searching' ? (
            <Spinner
              size="sm"
              color="gray.900"
              accessibilityLabel="Searching animes"
            />
          ) : undefined
        }
      />
      <View display={searchStatus === 'search-completed' ? 'none' : undefined}>
        <PaginatedFlatList
          getData={getAnimeListAsync}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={item => item.id}
          incrementBy={10}
          renderItem={({item}) => (
            <AnimeCard
              anime={item}
              isFavorite={favorite.animes.some(a => a.id === item.id)}
              onAddFavorite={add}
              onRemoveFavorite={remove}
              onPress={console.log}
            />
          )}
        />
      </View>
      <View display={searchStatus === 'clear' ? 'none' : undefined}>
        <AnimeSearchList
          data={animes}
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => (
            <AnimeCard
              anime={item}
              isFavorite={favorite.animes.some(a => a.id === item.id)}
              onAddFavorite={add}
              onRemoveFavorite={remove}
              onPress={console.log}
            />
          )}
        />
      </View>
    </View>
  );
};

const ListSeparator = () => <View mb={4} />;

export default AnimeListScreen;
