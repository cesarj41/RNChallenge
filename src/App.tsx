import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {SliderProvider} from './providers/SliderProvider';
import {ScreenContainer} from './screens';
import ErrorBoundary from './components/ErrorBoundary';
import {FavoriteAnimeProvider} from './providers/FavoriteAnimeProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <NativeBaseProvider>
        <SliderProvider>
          <FavoriteAnimeProvider>
            <ScreenContainer />
          </FavoriteAnimeProvider>
        </SliderProvider>
      </NativeBaseProvider>
    </ErrorBoundary>
  );
};

export default App;
