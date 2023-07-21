import { useState, useEffect, useContext } from 'react'
import { type IFilter, type Book } from '../types'
import { BooksContext, type StateType } from '../context/BookContext'
import json from '../mocks/books.json'
import { CACHE_KEY } from '../config'
import { readFromCache } from '../libs/cache'

export const useBooks = (): {
  availableBooks: Book[]
  filters: IFilter
  filteredBooks: Book[]
  readingBooks: Book[]
  genres: string[]
} => {
  const { state, setBooks, hydrateData } = useContext(BooksContext)
  const { filters, books } = state

  const [genres, setGenres] = useState<string[]>([])

  const getGenres = (books: Book[]): string[] =>
    [...new Set(books.map(i => i.genre))] as string[]

  useEffect(() => {
    const cacheData = readFromCache(CACHE_KEY) as StateType
    if (cacheData != null) {
      hydrateData(cacheData)
      const genres = getGenres(cacheData.books)
      setGenres(genres)
    } else {
      const books = json.library.map(item => ({
        ...item.book,
        read: false,
        priority: Infinity
      }))
      const genres = getGenres(books)
      setBooks(books)
      setGenres(genres)
    }
  }, [])

  const { genre, pages, authorOrTitle, orderReadByPriority } = filters
  const filteredBooks = books.filter(
    book =>
      !book.read &&
      book.pages >= pages &&
      (genre === 'all' || book.genre === genre) &&
      (authorOrTitle === '' ||
        book.title.toLowerCase().includes(authorOrTitle.toLowerCase()) ||
        book.author.name.toLowerCase().includes(authorOrTitle.toLowerCase()))
  )

  let readingBooks = books.filter(book => book.read)
  if (orderReadByPriority) {
    readingBooks = readingBooks.sort((a, b) => a.priority - b.priority)
  }

  const availableBooks = books.filter(book => !book.read)

  return { availableBooks, filters, filteredBooks, readingBooks, genres }
}
