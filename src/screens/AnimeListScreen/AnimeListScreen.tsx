import React from 'react';
import {Input, View, Button} from 'native-base';
import {
  getAnimeListAsync,
  searchAnimeAsync,
} from '../../services/anime-service';
import PaginatedFlatList from '../../components/PaginatedFlatList';
import AnimeCard from './AnimeCard';
import AnimeSearchList from './AnimeList';
import {Anime} from '../../@types';

const AnimeListScreen = () => {
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
      />
      <View display={searchStatus === 'search-completed' ? 'none' : undefined}>
        <PaginatedFlatList
          getData={getAnimeListAsync}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={item => item.id}
          incrementBy={10}
          renderItem={({item}) => (
            <AnimeCard
              {...item.attributes}
              id={item.id}
              onAddFavorite={console.log}
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
              {...item.attributes}
              id={item.id}
              onAddFavorite={console.log}
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
