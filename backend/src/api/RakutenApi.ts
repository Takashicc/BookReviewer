import dotenv from "dotenv";
import axios from "../config/axios";
import {
  HttpCode,
  RakutenBookNotFoundError,
  RakutenBookSystemError,
  RakutenBookTooManyRequestsError,
} from "../Error/Error";
import ApiTypes from "./ApiTypes";

dotenv.config();

interface RAKUTEN_BOOKS_RESPONSE {
  error: string;
  Items: {
    author: string;
    title: string;
    isbn: string;
    salesDate: string;
    publisherName: string;
    itemPrice: number;
    itemUrl: string;
    largeImageUrl: string;
  }[];
}

// TODO support for sort type
// const RAKUTEN_BOOKS_SORT_TYPE = {
//   standard: "standard",
//   sales: "sales",
//   "+releaseDate": "+releaseDate",
//   "-releaseDate": "-releaseDate",
//   "+itemPrice": "+itemPrice",
//   "-itemPrice": "-itemPrice",
//   reviewCount: "reviewCount",
//   reviewAverage: "reviewAverage",
// } as const;
// type RAKUTEN_BOOKS_SORT_TYPE =
//   typeof RAKUTEN_BOOKS_SORT_TYPE[keyof typeof RAKUTEN_BOOKS_SORT_TYPE];

const RAKUTEN_BOOKS_BASE_URL: string =
  "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404";

const RAKUTEN_BOOKS_COMMON_PARAMS = {
  applicationId: process.env.RAKUTEN_APPLICATION_ID,
  formatVersion: 2,
  format: "json",
  outOfStockFlag: 1,
  elements:
    "author,title,isbn,salesDate,publisherName,itemPrice,itemUrl,largeImageUrl",
  hits: 5,
};

/**
 * Find book information by book's title.
 *
 * @param title Book title
 * @returns Array of book's information
 */
export async function findBooksByTitle(
  title: string | undefined
): Promise<ApiTypes.BookInfo[]> {
  const bookInfos: ApiTypes.BookInfo[] = [];
  try {
    const response = await axios.get<RAKUTEN_BOOKS_RESPONSE>(
      RAKUTEN_BOOKS_BASE_URL,
      { params: { ...RAKUTEN_BOOKS_COMMON_PARAMS, title } }
    );

    validateRakutenError(response.data);

    const bookItems = response.data.Items;
    for (let i = 0; i < bookItems.length; i++) {
      const bookItem = bookItems[i];
      const bookInfo: ApiTypes.BookInfo = {
        author: bookItem.author,
        title: bookItem.title,
        isbn: bookItem.isbn,
        releasedAt: bookItem.salesDate,
        publisher: bookItem.publisherName,
        price: bookItem.itemPrice,
        rakutenUrl: bookItem.itemUrl,
        rakutenLargeImageUrl: bookItem.largeImageUrl,
      };
      bookInfos.push(bookInfo);
    }
  } catch (e) {
    throw e;
  }

  return bookInfos;
}

/**
 * Find book information by book's isbn.
 *
 * @param isbn Book isbn
 * @returns book's information
 */
export async function findBookByISBN(
  isbn: string
): Promise<ApiTypes.BookInfo | null> {
  let bookInfo: ApiTypes.BookInfo | null = null;
  try {
    const response = await axios.get<RAKUTEN_BOOKS_RESPONSE>(
      RAKUTEN_BOOKS_BASE_URL,
      { params: { ...RAKUTEN_BOOKS_COMMON_PARAMS, isbn } }
    );

    validateRakutenError(response.data);

    const bookItems = response.data.Items;
    const bookItem = bookItems[0];
    bookInfo = {
      author: bookItem.author,
      title: bookItem.title,
      isbn: bookItem.isbn,
      releasedAt: bookItem.salesDate,
      publisher: bookItem.publisherName,
      price: bookItem.itemPrice,
      rakutenUrl: bookItem.itemUrl,
      rakutenLargeImageUrl: bookItem.largeImageUrl,
    };
  } catch (e) {
    throw e;
  }

  return bookInfo;
}

/**
 * Validate rakuten books api response.
 * Return nothing when no error was found.
 * Throw a error when error was found.
 *
 * @param responseData Response data
 */
function validateRakutenError(responseData: { error?: string }) {
  const responseError = responseData.error;

  if (responseError === "not_found" || !Object.keys(responseData).length) {
    throw new RakutenBookNotFoundError({
      message: "Cannot find book.",
      httpCode: HttpCode.NOT_FOUND,
    });
  }

  if (responseError === undefined) {
    return;
  }

  if (responseError === "too_many_requests") {
    throw new RakutenBookTooManyRequestsError({
      message: "Too many requests.",
      httpCode: HttpCode.TOO_MANY_REQUESTS,
    });
  }

  if (responseError === "system_error") {
    throw new RakutenBookSystemError({
      message: "API system error.",
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
  }

  if (responseError === "service_unavailable") {
    throw new RakutenBookSystemError({
      message: "API is under maintenance.",
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
  }
}
