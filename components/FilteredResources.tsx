import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import rehabData from '../Addiction_Rehabs_Directory_With_Details.json';

const FilteredResources = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract categories from the data
  const categories = {
    all: 'All Categories',
    alcohol_and_drug: 'Alcohol and Drug Addiction Rehabs',
    specialized: 'Specialized Treatment Programs',
    by_substance: 'Treatment By Substance'
  };

  // Function to get filtered resources based on selected category
  const getFilteredResources = () => {
    const data = rehabData.Find_Addiction_Rehabs;
    
    switch (selectedCategory) {
      case 'alcohol_and_drug':
        return data.Alcohol_and_Drug_Addiction_Rehabs;
      case 'specialized':
        return data.Specialized_Treatment_Programs;
      case 'by_substance':
        return data.Treatment_By_Substance;
      default:
        return [
          ...data.Alcohol_and_Drug_Addiction_Rehabs,
          ...data.Specialized_Treatment_Programs,
          ...data.Treatment_By_Substance
        ];
    }
  };

  const navigateToDetails = (resource: any) => {
    router.push({
      pathname: '/resources/[id]',
      params: {
        name: resource.name,
        summary: resource.summary,
        link: resource.link
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {Object.entries(categories).map(([value, label]) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <ScrollView style={styles.resourcesList}>
        {getFilteredResources().map((resource, index) => (
          <Pressable
            key={index}
            style={styles.resourceCard}
            onPress={() => navigateToDetails(resource)}
          >
            <Text style={styles.resourceName}>{resource.name}</Text>
            <Text style={styles.resourceSummary} numberOfLines={2}>
              {resource.summary}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    height: 50,
  },
  resourcesList: {
    padding: 16,
  },
  resourceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resourceSummary: {
    fontSize: 14,
    color: '#666',
  },
});

export default FilteredResources;