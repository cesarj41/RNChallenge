import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {
  Avatar,
  Heading,
  Row,
  ScrollView,
  Text,
  View,
  Pressable,
} from 'native-base';
import {Screens} from '../../@types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {redirectAsync} from '../../services/resource-service';

type Props = Screens<'AnimeDetailScreen'>;
const AnimeDetailScreen = ({
  route: {
    params: {
      anime: {attributes},
    },
  },
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView p={6} h="100%">
        <Row justifyContent="space-between" mb={10}>
          <View flex={1}>
            <Avatar size="lg" source={{uri: attributes.posterImage.small}} />
          </View>
          <View flex={3}>
            <Heading size="lg" numberOfLines={2} mb={1}>
              {attributes.titles.en}
            </Heading>
            <Text>{attributes.ageRatingGuide}</Text>
          </View>
        </Row>
        <Pressable onPress={() => redirectAsync(attributes.youtubeVideoId)}>
          <ImageBackground
            source={{uri: attributes.coverImage?.small}}
            imageStyle={[
              styles.preview,
              attributes.coverImage ? undefined : styles.noPreview,
            ]}
            style={styles.preview}>
            <Text color="white">Watch trailer</Text>
          </ImageBackground>
        </Pressable>
        <Row mt={12} mb={4} justifyContent="space-between">
          <Heading size="md">Synopsis</Heading>
          <View justifyContent="flex-end">
            <Text fontWeight="500" color="teal.500">
              ({attributes.status})
            </Text>
          </View>
        </Row>
        <View mb={6}>
          <Text>{attributes.synopsis}</Text>
        </View>
        <Row>
          <View flex={2}>
            <Text fontWeight="600" fontSize="sm" mb={2}>
              Rating
            </Text>
            <Heading color="teal.600">{attributes.ratingRank}</Heading>
          </View>
          <View flex={3}>
            <Text fontWeight="600" fontSize="sm" mb={2}>
              Popularity
            </Text>
            <Heading color="teal.600">{attributes.popularityRank}</Heading>
          </View>
        </Row>
        <View h={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e4e4e7',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 190,
    borderRadius: 25,
  },
  noPreview: {
    backgroundColor: 'black',
  },
});

export default AnimeDetailScreen;
