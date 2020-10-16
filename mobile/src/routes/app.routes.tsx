import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderCreate from '../components/HeaderCreate';

import Landing from '../pages/Landing';
import Map from '../pages/Map';
import Orphanage from '../pages/Orphanage';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import Create from '../pages/CreateOrphanage/Create';

const routesStack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <routesStack.Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#F2F3F5'}}}>
      <routesStack.Screen name="Landing" component={Landing}
        options={{
          cardStyle: {backgroundColor: '#07C4C9'}
        }}
      />
      <routesStack.Screen name="Map" component={Map}/>

      <routesStack.Screen name="Orphanage" component={Orphanage}
        options={{
          headerShown: true,
          header: () => <HeaderCreate showCancel={false} title="Orfanato" />
        }}
      />
      <routesStack.Screen name="SelectMapPosition" component={SelectMapPosition}
        options={{
          headerShown: true,
          header: () => <HeaderCreate title="Selecione Localização" />
        }}
      />
      <routesStack.Screen name="Create" component={Create}
        options={{
          headerShown: true,
          header: () => <HeaderCreate title="Informe os Dados" />
        }}
      />
    </routesStack.Navigator>
  );
}

export default AppRoutes;