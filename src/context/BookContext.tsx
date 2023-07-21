import { createContext, useReducer } from 'react'
import { type IFilter, type Book } from '../types'
import { saveToCache } from '../libs/cache'
import { CACHE_KEY } from '../config'

export interface StateType {
  filters: IFilter
  books: Book[]
}

const INITIAL_STATE = {
  filters: {
    genre: 'all',
    pages: 0,
    authorOrTitle: '',
    orderReadByPriority: false
  },
  books: []
}

interface SetBooksActionType {
  type: 'SET_BOOKS'
  payload: Book[]
}

interface UpdateFilterPagesActionType {
  type: 'UPDATE_FILTER_PAGES'
  payload: number
}

interface UpdateFilterGenreActionType {
  type: 'UPDATE_FILTER_GENRE'
  payload: string
}

interface UpdateFilterAuthorOrTitleActionType {
  type: 'UPDATE_FILTER_AUTHOR_OR_TITLE'
  payload: string
}

interface ToggleReadActionType {
  type: 'TOGGLE_READ'
  payload: string
}

interface ToggleReadActionType {
  type: 'TOGGLE_READ'
  payload: string
}

interface HydrateDataActionType {
  type: 'HYDRATE_DATA'
  payload: StateType
}

interface ToggleOrderReadByPriorityActionType {
  type: 'TOGGLE_ORDER_READ_BY_PRIORITY'
  payload: null
}

type ActionType =
  | SetBooksActionType
  | UpdateFilterPagesActionType
  | UpdateFilterGenreActionType
  | UpdateFilterAuthorOrTitleActionType
  | ToggleReadActionType
  | HydrateDataActionType
  | ToggleOrderReadByPriorityActionType

const reducer = (state: StateType, action: ActionType): StateType => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'SET_BOOKS': {
      const newState = {
        ...state,
        books: actionPayload
      }
      saveToCache(CACHE_KEY, newState)
      return newState
    }

    case 'UPDATE_FILTER_PAGES': {
      const newFilters = structuredClone(state.filters)
      newFilters.pages = actionPayload
      const newState = {
        ...state,
        filters: newFilters
      }
      saveToCache(CACHE_KEY, newState)
      return newState
    }

    case 'UPDATE_FILTER_GENRE': {
      const newFilters = structuredClone(state.filters)
      newFilters.genre = actionPayload
      const newState = {
        ...state,
        filters: newFilters
      }
      saveToCache(CACHE_KEY, newState)
      return newState
    }

    case 'UPDATE_FILTER_AUTHOR_OR_TITLE': {
      const newFilters = structuredClone(state.filters)
      newFilters.authorOrTitle = actionPayload
      const newState = {
        ...state,
        filters: newFilters
      }
      saveToCache(CACHE_KEY, newState)
      return newState
    }

    case 'TOGGLE_READ': {
      const index = state.books.findIndex(book => book.ISBN === actionPayload)
      if (index === -1) return state

      const newBooks = structuredClone(state.books)
      newBooks[index].read = !newBooks[index].read
      newBooks[index].priority = !newBooks[index].read
        ? Infinity
        : new Date().getTime()
      const newState = {
        ...state,
        books: newBooks
      }
      saveToCache(CACHE_KEY, newState)
      return newState
    }

    case 'HYDRATE_DATA': {
      return {
        ...actionPayload
      }
    }

    case 'TOGGLE_ORDER_READ_BY_PRIORITY': {
      const newFilters = structuredClone(state.filters)
      newFilters.orderReadByPriority = !newFilters.orderReadByPriority
      return {
        ...state,
        filters: newFilters
      }
    }

    default: {
      return state
    }
  }
}

export const BooksContext = createContext<{
  state: StateType
  // setBooks: React.Dispatch<ActionType>
  setBooks: (books: Book[]) => void
  updateFilterPages: (pages: number) => void
  updateFilterGenre: (genre: string) => void
  updateFilterAuthorOrTitle: (genre: string) => void
  toggleRead: (genre: string) => void
  hydrateData: (data: StateType) => void
  toggleOrderReadByPriority: () => void
}>({
  state: INITIAL_STATE,
  setBooks: () => {},
  updateFilterPages: () => {},
  updateFilterGenre: () => {},
  updateFilterAuthorOrTitle: () => {},
  toggleRead: () => {},
  hydrateData: () => {},
  toggleOrderReadByPriority: () => {}
})

interface BookProviderProps {
  children?: React.ReactNode
}

export const BookProvider: React.FC<BookProviderProps> = ({
  children
}: BookProviderProps) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const setBooks = (books: Book[]): void => {
    dispatch({
      type: 'SET_BOOKS',
      payload: books
    })
  }

  const updateFilterPages = (pages: number): void => {
    dispatch({
      type: 'UPDATE_FILTER_PAGES',
      payload: pages
    })
  }

  const updateFilterGenre = (genre: string): void => {
    dispatch({
      type: 'UPDATE_FILTER_GENRE',
      payload: genre
    })
  }

  const updateFilterAuthorOrTitle = (genre: string): void => {
    dispatch({
      type: 'UPDATE_FILTER_AUTHOR_OR_TITLE',
      payload: genre
    })
  }

  const toggleRead = (ISBN: string): void => {
    dispatch({
      type: 'TOGGLE_READ',
      payload: ISBN
    })
  }

  const hydrateData = (data: StateType): void => {
    dispatch({
      type: 'HYDRATE_DATA',
      payload: data
    })
  }

  const toggleOrderReadByPriority = (): void => {
    dispatch({ type: 'TOGGLE_ORDER_READ_BY_PRIORITY', payload: null })
  }

  return (
    <BooksContext.Provider
      value={{
        state,
        setBooks,
        updateFilterPages,
        updateFilterGenre,
        updateFilterAuthorOrTitle,
        toggleRead,
        hydrateData,
        toggleOrderReadByPriority
      }}>
      {children}
    </BooksContext.Provider>
  )
}
