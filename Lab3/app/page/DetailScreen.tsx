import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../index';

type RepoDetailsRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

const openGitHubLink = async (url: string | undefined) => {
  if (!url) {
    Alert.alert('Error', 'No GitHub URL is available for this repository.');
    return;
  }

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', "Can't open the URL");
    }
  } catch (error) {
    Alert.alert('Error', 'An unexpected error occurred while opening the link.');
    console.error(error);
  }
};

const DetailScreen = ({ route }: { route: RepoDetailsRouteProp }) => {
  const { repo } = route.params;

  const repoUrl = repo.html_url || `https://github.com/${repo.owner.login}/${repo.name}`;

  console.log('Repo received in DetailScreen:', repo);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.name}</Text>
      <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
      <Text style={styles.owner}>Owner: {repo.owner.login}</Text>
      <Text style={styles.description}>{repo.description || 'No description available'}</Text>
      <Text style={styles.text}>Stars: {repo.stargazerCount}</Text>
      <Text style={styles.text}>Forks: {repo.forks.totalCount}</Text>
      <Text style={styles.text}>Primary Language: {repo.primaryLanguage?.name || 'N/A'}</Text>
      <Text style={styles.text}>Watchers: {repo.watchers.totalCount}</Text>

      <Button title="View on GitHub" onPress={() => openGitHubLink(repoUrl)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  owner: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DetailScreen;
