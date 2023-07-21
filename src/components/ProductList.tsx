import { useBooks } from '../hooks/useBooks'
import { BookItem } from './BookItem'

export const ProductList: React.FC = () => {
  const { filteredBooks } = useBooks()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6'>
      {filteredBooks.map(book => (
        <BookItem key={book.ISBN} book={book} />
      ))}
    </div>
  )
}
