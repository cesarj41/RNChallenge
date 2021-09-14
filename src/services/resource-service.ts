import {Linking} from 'react-native';

export const redirectAsync = async (uri: string) => {
  try {
    await Linking.openURL(`vnd.youtube://watch?v=${uri}`);
  } catch (error) {
    console.error(error);
  }
};
