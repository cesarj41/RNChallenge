import React from 'react';
import {Row, View, Image, Text, Heading, Pressable, Button} from 'native-base';
import {Anime} from '../../@types';

type Props = {
  anime: Anime;
  isFavorite?: boolean;
  onPress: (anime: Anime) => void;
  onAddFavorite: (anime: Anime) => void;
  onRemoveFavorite: (id: string) => void;
};
const AnimeCard = ({
  anime,
  onPress,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}: Props) => (
  <Row>
    <Pressable onPress={() => onPress(anime)}>
      <Image
        borderRadius={15}
        source={{
          uri: anime.attributes.posterImage.small,
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
            {anime.attributes.canonicalTitle}
          </Heading>
          <Text>{anime.attributes.averageRating}</Text>
        </View>
        <View justifyContent="center">
          {!isFavorite && (
            <Button size="xs" onPress={() => onAddFavorite(anime)}>
              <Text color="white" fontSize="xs">
                Agregar
              </Text>
              <Text color="white" fontSize="xs">
                Favoritos
              </Text>
            </Button>
          )}
          {isFavorite && (
            <Button
              colorScheme="dark"
              size="xs"
              onPress={() => onRemoveFavorite(anime.id)}>
              <Text color="white" fontSize="xs">
                Quitar
              </Text>
              <Text color="white" fontSize="xs">
                Favoritos
              </Text>
            </Button>
          )}
        </View>
      </Row>
    </View>
  </Row>
);

export default AnimeCard;
