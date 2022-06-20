import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RepositoryInfo } from './RepositoryList';

const styles = StyleSheet.create({
  outer: {
    paddingTop: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  coreInfo: {
    padding: 7,
    flexDirection: 'row',
  },
  textInfo: {
    paddingLeft: 10,
  },
  bolded: {
    fontWeight: 'bold',
  },
  centred: {
    textAlign: 'center',
  },
  languageTag: {
    backgroundColor: '#0366d6',
    padding: 5,
    color: 'white',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  hasMB: {
    marginBottom: 5,
  },
  statisticsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

interface RepositoryItemProps {
  item: RepositoryInfo;
}

function RepositoryItem({ item }: RepositoryItemProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.coreInfo}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.textInfo}>
          <Text style={[styles.bolded, styles.hasMB]}>{item.fullName}</Text>
          <Text style={[styles.hasMB]}>{item.description}</Text>
          <Text style={[styles.languageTag, styles.hasMB]}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.statisticsBar}>
        <View>
          <Text style={[styles.bolded, styles.centred]}>
            {formatNumber(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text style={[styles.bolded, styles.centred]}>
            {formatNumber(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text style={[styles.bolded, styles.centred]}>
            {formatNumber(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text style={[styles.bolded, styles.centred]}>
            {formatNumber(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
}

function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  const divided = num / 1000;
  return divided.toFixed(1) + 'k';
}

export default RepositoryItem;
