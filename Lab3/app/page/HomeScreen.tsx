import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Repository } from '../index';

const LANGUAGES = [
  'All', 
  'C++', 
  'JavaScript', 
  'Python', 
  'Java', 
  'Go', 
  'Ruby', 
  'TypeScript', 
  'C#', 
  'PHP', 
  'Swift', 
  'Kotlin', 
  'Rust', 
  'Dart', 
  'Shell', 
  'Objective-C', 
  'Vue'
];

const YEARS = Array.from({ length: new Date().getFullYear() - 2007 }, (_, i) => (2008 + i).toString()); // Years from 2008 to the current year

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      setRepositories([]);
      const languageQuery =  selectedLanguage !== 'All' ? `language:${selectedLanguage}` : 'stars:>1000';
      const yearQuery = selectedYear ? `created:>${selectedYear}-01-01` : '';
      const query = [languageQuery, yearQuery].filter(Boolean).join(' '); // Combine filters
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
        );
        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
          const formattedData = data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            stargazerCount: item.stargazers_count,
            forks: { totalCount: item.forks_count },
            primaryLanguage: { name: item.language },
            licenseInfo: { name: item.license?.name },
            watchers: { totalCount: item.watchers_count },
            createdAt: item.created_at,
            owner: {
              login: item.owner.login,
              avatar_url: item.owner.avatar_url,
            },
          }));
          setRepositories(formattedData);
        } else {
          setRepositories([]);
        }
      } catch (error) {
        console.error(error);
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [selectedLanguage, selectedYear]);

  const handleRepositoryPress = (repo: Repository) => {
    navigation.navigate('DetailScreen', { repo });
  };

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <View style={styles.pickerContainer}>
          <Text style={styles.filterLabel}>Language:</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
            style={styles.picker}
          >
            {LANGUAGES.map((language) => (
              <Picker.Item key={language} label={language} value={language} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.filterLabel}>Year:</Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(value) => setSelectedYear(value)}
            style={styles.picker}
          >
            <Picker.Item label="All" value="" />
            {YEARS.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Repository List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repositories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleRepositoryPress(item)}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text style={styles.repoDescription}>{item.description || 'No description available'}</Text>
              <Text style={styles.repoStars}>⭐ {item.stargazerCount}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No repositories found</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  picker: {
    height: 55, // Increased height for better text visibility
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center', // Center-align text vertically
  },
  pickerItem: {
    fontSize: 16, // Ensures text is readable
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  repoDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  repoStars: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
