import {Linking} from 'react-native';

export const redirectAsync = async (uri: string) => {
  const url = `vnd.youtube://watch?v=${uri}`;
  const altUrl = `https://www.youtube.com/watch?v=${uri}`;

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.warn(error);
    try {
      await Linking.openURL(altUrl);
    } catch (err) {
      console.warn(err);
    }
  }
};
