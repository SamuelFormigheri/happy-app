import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const routesStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <routesStack.Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#07C4C9'}}}>
      <routesStack.Screen name="Login" component={Login}/>
      <routesStack.Screen name="Register" component={Register}/>
    </routesStack.Navigator>
  );
}

export default AuthRoutes;