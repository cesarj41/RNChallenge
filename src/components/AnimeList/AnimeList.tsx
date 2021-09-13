import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {Anime} from '../../@types';
import AnimeCard from './AnimeCard';

type Props = Omit<FlatListProps<Anime>, 'keyExtractor'>;
const AnimeList = (props: Props) => (
  <FlatList<Anime>
    {...props}
    keyExtractor={item => item.id}
    contentContainerStyle={{paddingTop: 24}}
  />
);

AnimeList.Card = AnimeCard;

export default AnimeList;
