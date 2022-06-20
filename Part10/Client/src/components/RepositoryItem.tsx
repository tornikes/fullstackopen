import React from 'react';
import { View, Text } from 'react-native';
import { RepositoryInfo } from './RepositoryList';

interface RepositoryItemProps {
  item: RepositoryInfo;
}

function RepositoryItem({ item }: RepositoryItemProps) {
  return (
    <View>
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
    </View>
  );
}

export default RepositoryItem;
