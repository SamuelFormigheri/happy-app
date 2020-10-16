import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

import GlobalProvider from './hooks/Global';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar  barStyle="light-content" backgroundColor="#07C4C9" translucent/>
      <GlobalProvider>
        <View style={{flex: 1,backgroundColor: '#07C4C9'}}>
          <Routes />
        </View>
      </GlobalProvider>
    </NavigationContainer>
    );
}

export default App;