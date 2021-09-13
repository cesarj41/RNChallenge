import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {Anime} from '../../@types';

type Props = Omit<FlatListProps<Anime>, 'keyExtractor'>;
const AnimeList = (props: Props) => (
  <FlatList<Anime>
    {...props}
    keyExtractor={item => item.id}
    contentContainerStyle={{paddingTop: 24}}
  />
);

export default AnimeList;
