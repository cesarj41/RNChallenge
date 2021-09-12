import React from 'react';
import {NativeBaseProvider} from 'native-base';
import QueryProvider from './providers/QueryProvider';
import {SliderProvider} from './providers/SliderProvider';
import {ScreenContainer} from './screens';
import ErrorBoundary from './components/ErrorBoundary';
import {FavoriteAnimeProvider} from './providers/FavoriteAnimeProvider';

const App = () => {
  return (
    <ErrorBoundary>
      <NativeBaseProvider>
        <QueryProvider>
          <SliderProvider>
            <FavoriteAnimeProvider>
              <ScreenContainer />
            </FavoriteAnimeProvider>
          </SliderProvider>
        </QueryProvider>
      </NativeBaseProvider>
    </ErrorBoundary>
  );
};

export default App;
