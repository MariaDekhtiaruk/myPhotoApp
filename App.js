import { View } from 'react-native';
// Added to avoid "Unable to resolve "react-native-gesture-handler" error
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { useState } from 'react';

import useCachedResources from './hooks/useCachedResources';
import Context from './context';
import { store } from './redux/store';
import Main from './components/Main';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const [context, setContext] = useState({});

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <Context.Provider value={{ context, setContext }}>
        <View style={{ height: '100%' }}>
          <Main />
        </View>
      </Context.Provider>
    </Provider>
  );
};

export default App;
