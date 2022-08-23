import axios from "axios";
import ApiTypes from "./ApiTypes";

export async function searchBookByTitle(q: string) {
  let bookInfos: ApiTypes.BookInfo[] = [];
  try {
    const response = await axios.get<ApiTypes.BookInfo[]>("/api/v1/search", {
      params: { q },
    });
    bookInfos = response.data;
  } catch (e) {
    console.error(e);
  }

  return bookInfos;
}

export async function findBookByISBN(isbn: string) {
  let bookInfo: ApiTypes.BookInfo | null = null;
  try {
    const response = await axios.get<ApiTypes.BookInfo>(
      `/api/v1/books/${isbn}`
    );
    bookInfo = response.data;
  } catch (e) {
    console.error(e);
  }

  return bookInfo;
}
