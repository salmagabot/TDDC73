import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './page/HomeScreen';
import DetailScreen from './page/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  DetailScreen: { repo: Repository };
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  stargazerCount: number;
  forks: { totalCount: number };
  primaryLanguage?: { name: string };
  licenseInfo?: { name: string };
  watchers: { totalCount: number };
  createdAt: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: item.html_url
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default App;
