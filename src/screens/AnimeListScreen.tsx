import React from 'react';
import {Input, View, Button} from 'native-base';
import AnimeList from '../components/AnimeList/AnimeList';

const AnimeListScreen = () => {
  const [filter, setFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const handleChangeText = (value: string) => {
    if (!value) {
      setFilter('');
    }

    setSearch(value);
  };
  const applyFilter = () => setFilter(search);
  return (
    <View p={4} flex={1}>
      <View bgColor="white" borderRadius={8}>
        <Input
          py={0}
          value={search}
          onChangeText={handleChangeText}
          onSubmitEditing={() => console.log('presione eso')}
          bgColor="white"
          variant="unstyled"
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
              onPress={applyFilter}>
              Search
            </Button>
          }
        />
      </View>
      <AnimeList filter={filter} />
    </View>
  );
};

export default AnimeListScreen;
