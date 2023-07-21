import { useContext } from 'react'
import { BooksContext } from '../context/BookContext'
import { type Book } from '../types'

interface BookItemProps {
  book: Book
  showOrder?: boolean
  order?: number
}

export const BookItem: React.FC<BookItemProps> = ({
  book,
  showOrder,
  order
}: BookItemProps) => {
  const { toggleRead } = useContext(BooksContext)
  const { ISBN, cover, title, author } = book

  return (
    <div
      className='cursor-pointer flex justify-center relative'
      onClick={() => {
        toggleRead(ISBN)
      }}>
      {showOrder === true && (
        <div className='absolute right-0 -top-3 sm:-right-2 md:right-2 lg:right-5 xl:-right-3'>
          <p className='flex h-2 w-2 items-center justify-center rounded-full bg-sky-700 p-[14px] text-base text-white font-bold'>
            {order}
          </p>
        </div>
      )}
      <img
        src={cover}
        alt={`${title} by ${author.name}`}
        className='max-h-64'
      />
    </div>
  )
}
