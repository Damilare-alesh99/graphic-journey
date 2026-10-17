import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Comic } from '../Models/Comic';
import { ComicService } from '../Data/ISBNLookupService';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

export type IsbnType = '10' | '13';

interface AddNewProps {
  navigation?: any;
}

export default function AddNew({ navigation }: AddNewProps) {
  const [fetchedComic, setFetchedComic] = useState<Comic | null>(null);
  const [comics, setComics] = useState<Comic[]>([]);
  const [showInvalidISBNAlert, setShowInvalidISBNAlert] = useState(false);
  const [selectedType, setSelectedType] = useState<IsbnType>('13');
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const service = useMemo(() => new ComicService(), []);

  function normalizeISBN(val: string): string {
    return val
      .toUpperCase()
      .replace(/-/g, '')
      .replace(/ /g, '');
  }

  function triggerAlert() {
    setShowInvalidISBNAlert(true);
    setLoading(false);
    setOpen(true);
    setMessage('Error: Invalid ISBN Number');
    Alert.alert('Important Message', 'Invalid ISBN number.', [
      { text: 'OK', onPress: () => setShowInvalidISBNAlert(false) },
    ]);
  }

  function isValidISBNTen(val: string): boolean {
    const digits = val.split('').filter((c) => /\d/.test(c)).map(Number);
    if (digits.length !== 10) {
      triggerAlert();
      throw new Error('Invalid ISBN Number');
    }

    const chars = Array.from(val);
    let sum = 0;
    try {
      for (let i = 0; i < 9; i++) {
        if (!/\d/.test(chars[i])) {
          triggerAlert();
          throw new Error('Invalid ISBN Number');
        }
        const digit = parseInt(chars[i], 10);
        sum += digit * (10 - i);
      }

      let lastValue = 0;
      if (chars[9] === 'X' || chars[9] === 'x') {
        lastValue = 10;
      } else if (/\d/.test(chars[9])) {
        lastValue = parseInt(chars[9], 10);
      } else {
        triggerAlert();
        throw new Error('Invalid ISBN Number');
      }

      sum += lastValue;
      const valid = sum % 11 === 0;
      if (!valid) {
        triggerAlert();
        throw new Error('Invalid ISBN Number');
      }
      return valid;
    } catch (e) {
      triggerAlert();
      throw new Error('Invalid ISBN Number');
    }
  }

  function isValidISBNThirteen(val: string): boolean {
    const digits = val.split('').filter((c) => /\d/.test(c)).map(Number);
    if (digits.length !== 13) {
      triggerAlert();
    }

    const sum = digits.reduce((result, digit, index) => {
      return result + digit * (index % 2 === 0 ? 1 : 3);
    }, 0);

    const valid = sum % 10 === 0;
    if (!valid) {
      triggerAlert();
      throw new Error('Invalid ISBN Number');
    }
    return valid;
  }

  const handleFetchBook = async () => {
    if (!isbn || isbn.trim() === '') {
      setOpen(true);
      setMessage('Please enter a valid ISBN');
      return;
    }
    try {

      setLoading(true);
      if (selectedType === '13') {
        isValidISBNThirteen(isbn);
      } else if (selectedType === '10') {
        isValidISBNTen(isbn);
      }

      const book = await service.fetchBook(isbn);

      setFetchedComic(book);
      if (navigation) {
        navigation.navigate('Display', { comic: book });
      }
    } catch (error: any) {
      setLoading(false);
      setOpen(true);

      setMessage('Error:' + (error.message || 'something went wrong while fetching the book. Try again later '));
    } finally {
      setIsbn('');
      setLoading(false);
    }
  };

  const handleClose = (
  ) => {

    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headline}>Input ISBN</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="ISBN"
            value={isbn}
            onChangeText={setIsbn}
            autoCapitalize="characters"
          />

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={[
                styles.pickerButton,
                selectedType === '10' && styles.pickerButtonActive,
              ]}
              onPress={() => setSelectedType('10')}
            >
              <Text
                style={[
                  styles.pickerText,
                  selectedType === '10' && styles.pickerTextActive,
                ]}
              >
                10
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pickerButton,
                selectedType === '13' && styles.pickerButtonActive,
              ]}
              onPress={() => setSelectedType('13')}
            >
              <Text
                style={[
                  styles.pickerText,
                  selectedType === '13' && styles.pickerTextActive,
                ]}
              >
                13
              </Text>
            </TouchableOpacity>
          </View>
        </View>


        <Button variant="contained" disabled={loading} onClick={handleFetchBook}>
          {!loading && <Text style={styles.fetchButtonText}>Fetch Book</Text>}
          {loading && <CircularProgress aria-label="Loading…" />}
        </Button>


      </View>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    gap: 20,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  pickerButtonActive: {
    backgroundColor: '#007AFF',
  },
  pickerText: {
    fontSize: 14,
    color: '#333',
  },
  pickerTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fetchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  fetchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
