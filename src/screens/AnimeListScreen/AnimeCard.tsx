import React from 'react';
import {Row, View, Image, Text, Heading, Pressable, Button} from 'native-base';
import {Anime} from '../../@types';

type Props = Pick<
  Anime['attributes'],
  'canonicalTitle' | 'averageRating' | 'posterImage'
> & {
  id: string;
  onPress: (id: string) => void;
  onAddFavorite: (id: string) => void;
};
const AnimeCard = ({
  id,
  posterImage,
  canonicalTitle,
  averageRating,
  onPress,
  onAddFavorite,
}: Props) => (
  <Row>
    <Pressable onPress={() => onPress(id)}>
      <Image
        borderRadius={15}
        source={{
          uri: posterImage.small,
        }}
        alt="Alternate Text"
        size="lg"
      />
    </Pressable>
    <View flex={1} py={2}>
      <Row
        bgColor="white"
        borderRightRadius={5}
        px={4}
        py={2}
        justifyContent="space-between">
        <View>
          <Heading size="sm" mb={4} maxW={150} numberOfLines={1}>
            {canonicalTitle}
          </Heading>
          <Text>{averageRating}</Text>
        </View>
        <View justifyContent="center">
          <Button size="xs" onPress={() => onAddFavorite(id)}>
            <Text color="white" fontSize="xs">
              Agregar
            </Text>
            <Text color="white" fontSize="xs">
              Favoritos
            </Text>
          </Button>
        </View>
      </Row>
    </View>
  </Row>
);

export default AnimeCard;
