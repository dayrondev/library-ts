import { useBooks } from '../hooks/useBooks'

export const Header: React.FC = () => {
  const { availableBooks, filteredBooks, readingBooks } = useBooks()
  const { length: availables } = availableBooks
  const { length: filtered } = filteredBooks

  return (
    <div className='mb-3'>
      <h2 className='text-4xl my-3'>{`${availables} ${
        availables === 1 ? 'libro disponible' : 'libros disponibles'
      }`}</h2>
      <h5 className='text-xl my-2'>{`${readingBooks.length} en la lista de lectura`}</h5>
      <h5 className='text-xl my-2'>{`${filtered} ${
        filtered === 1 ? 'resultado' : 'resultados'
      }`}</h5>
    </div>
  )
}
