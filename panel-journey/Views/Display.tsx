import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, ScrollView } from 'react-native';
import { Comic } from '../Models/Comic';


import generic from '../assets/defaultCovers/generic-default.jpeg';
import image from '../assets/defaultCovers/image.png';
import darkHorse from '../assets/defaultCovers/darkHorse.png';
import dc from '../assets/defaultCovers/dc.jpeg';
import marvel from '../assets/defaultCovers/marvel.png';

interface DisplayProps {
  comic?: Comic | null;
  route?: {
    params?: {
      comic?: Comic;
    };
  };
}

export function defaultCover(publisher?: string): ImageSourcePropType {
  if (!publisher) {
    return generic;
  }

  const p = publisher.toLowerCase();
console.log(p)
  if (p.includes('marvel')) {
    return marvel;
  } else if (p.includes('dc')) {
    return dc;
  } else if (p.includes('dark horse')) {
    return darkHorse;
  } else if (p.includes('image')) {
    return image;
  } else {
    return generic;
  }
}

export default function Display({ comic: propComic, route }: DisplayProps) {
  const comic = propComic ?? route?.params?.comic ?? null;
  const [imageError, setImageError] = useState(false);

  const firstPublisher = comic?.publishers?.[0];
  const coverID = comic?.covers?.[0];
  const defaultCoverSource = defaultCover(firstPublisher);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Details</Text>

      {coverID && !imageError ? (
        <Image
          source={{
            uri: `https://covers.openlibrary.org/b/id/${coverID}-L.jpg`,
          }}
          style={styles.coverImage}
          resizeMode="contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <Image
          source={defaultCoverSource}
          style={styles.coverImage}
          resizeMode="contain"
        />
      )}

      <Text style={styles.text}>Title : {comic?.title ?? ''}</Text>

      <Text style={styles.text}>
        Number of Pages : {comic?.numberOfPages ?? 0}
      </Text>

      <Text style={styles.text}>Isbn 13 : {comic?.isbn13?.[0] ?? ''}</Text>

      <View style={styles.hStack}>
        <Text style={styles.text}>Subjects:</Text>
        {(comic?.subjects ?? []).map((subject, index) => (
          <Text key={index} style={styles.itemText}>
            {subject}
          </Text>
        ))}
      </View>

      <Text style={styles.text}>
        Publish Date : {comic?.publishDate ?? ''}
      </Text>

      <View style={styles.hStack}>
        <Text style={styles.text}>Publisher(s):</Text>
        {(comic?.publishers ?? []).map((publisher, index) => (
          <Text key={index} style={styles.itemText}>
            {publisher}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coverImage: {
    width: 200,
    height: 300,
  },
  text: {
    fontSize: 16,
  },
  hStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: 16,
    marginHorizontal: 2,
  },
});
