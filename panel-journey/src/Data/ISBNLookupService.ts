import axios from 'axios';
import { Comic } from '../Models/Comic';

const API_BASE_URL = 'http://localhost:8000';

export class ComicService {
  async fetchBook(isbn: string): Promise<Comic> {
    const cleanIsbn = isbn.replace(/-/g, '').replace(/ /g, '').trim();

    try {
      const response = await axios.post<Comic>(
        `${API_BASE_URL}/api/books/lookup`,
        {
          isbn: cleanIsbn,
        }
        // `https://openlibrary.org/isbn/${cleanIsbn}.json`
      );
      console.log(response.data);
      const data = response.data;

      const comic: Comic = {
        ...data,
        numberOfPages: data.numberOfPages ?? data.number_of_pages,
        publishDate: data.publishDate ?? data.publish_date,
        isbn13: data.isbn13 ?? data.isbn_13,
        lcClassifications: data.lcClassifications ?? data.lc_classifications,
      };

      console.log(comic);
      return comic;
    } catch (error: any) {
      if (error.response) {
        console.log('OpenLibrary API error:', error.response.status);
      }
      throw error;
    }
  }
}
