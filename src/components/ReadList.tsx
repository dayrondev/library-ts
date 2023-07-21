import { useContext } from 'react'
import { BooksContext } from '../context/BookContext'
import { useBooks } from '../hooks/useBooks'
import { BookItem } from './BookItem'

export const ReadList: React.FC = () => {
  const { state, toggleOrderReadByPriority } = useContext(BooksContext)
  const {
    filters: { orderReadByPriority }
  } = state
  const { readingBooks } = useBooks()

  const handleChange = (): void => {
    // const { checked } = event.target
    toggleOrderReadByPriority()
  }

  if (readingBooks.length === 0) return null

  return (
    <div className='w-full lg:w-1/3 p-4 mt-6'>
      <div className='border border-solid border-red rounded-xl p-4 xl:p-0 flex flex-col text-center'>
        <h2 className='text-4xl mt-4 lg:mt-4 xl:mt-6 mb-4'>Lista de lectura</h2>
        <label className='text-lg mb-4'>
          <input
            type='checkbox'
            id='priority-order'
            checked={orderReadByPriority}
            onChange={handleChange}
            className='mr-3 w-4 h-4 rounded'
          />
          Ordenar por prioridad
        </label>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-6 p-4'>
          {readingBooks.map((book, index) => (
            <BookItem
              key={book.ISBN}
              book={book}
              showOrder={orderReadByPriority}
              order={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
