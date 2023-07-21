export interface IFilter {
  genre: string
  pages: number
  authorOrTitle: string
  orderReadByPriority: boolean
}

export interface LibraryAPIResponse {
  library: Library[]
}

export interface Library {
  book: Book
}

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
  read: boolean
  priority: number
}

export interface Author {
  name: string
  otherBooks: string[]
}
