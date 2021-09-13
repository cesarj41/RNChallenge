import React from 'react';
import {
  Center,
  Avatar,
  View,
  Text,
  Heading,
  Row,
  ScrollView,
  Divider,
  Box,
  Button,
} from 'native-base';
import {Screens} from '../@types';

const ProfileScreen = ({navigation: {navigate}}: Screens<'ProfileScreen'>) => (
  <Box>
    <ScrollView pt={10} bgColor="white" h="100%">
      <Center mb={10}>
        <Avatar
          w="40%"
          h={160}
          source={{
            uri: 'https://avatars.githubusercontent.com/u/30401938?s=400&u=02c51ba2d4731963d1183da981eba1b5a7e07c57&v=4',
          }}>
          CM
        </Avatar>
        <Heading fontWeight={400} size="xl" mt={4}>
          Cesar Martinez
        </Heading>
        <Row justifyContent="space-between" mt={2}>
          <Text fontWeight="300">@cesarj2212</Text>
          <View borderWidth={0.5} mx="5%" />
          <Text fontWeight="300">github.com/cesarj41</Text>
        </Row>
        <Text fontWeight="400" fontSize="lg" mt={4}>
          Dominican Republic
        </Text>
      </Center>
      <Divider />
      <Center px={5} mt={6}>
        <Text fontWeight="300">
          Full Stack software engineer specialized in web and mobile
          applications. 5+ years of experience in designing, developing, and
          maintaining applications. Always learning new technologies to keep
          innovating in the field, very passionate for app performance and
          improving user experience.
        </Text>
      </Center>
    </ScrollView>
    <Row position="absolute" bottom={0} w="100%" pb={10} justifyContent="space-around" px={5}>
      <Button
        flex={3}
        mr={2}
        colorScheme="amber"
        _text={{color: 'white'}}
        onPress={() => navigate('FavoriteAnimeListScreen')}>
        Favorites
      </Button>
      <Button flex={3} onPress={() => navigate('AnimeListScreen')}>Animes</Button>
    </Row>
  </Box>
);

export default ProfileScreen;
