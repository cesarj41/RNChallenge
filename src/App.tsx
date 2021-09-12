import React from 'react';
import {NativeBaseProvider} from 'native-base';
import QueryProvider from './providers/QueryProvider';
import {SliderProvider} from './providers/SliderProvider';
import {ScreenContainer} from './screens';
import ErrorBoundary from './components/ErrorBoundary';
import {getAnimeListAsync} from './services/anime-service';

const App = () => {
  getAnimeListAsync();
  return (
    <ErrorBoundary>
      <NativeBaseProvider>
        <QueryProvider>
          <SliderProvider>
            <ScreenContainer />
          </SliderProvider>
        </QueryProvider>
      </NativeBaseProvider>
    </ErrorBoundary>
  );
};

export default App;
