import { useContext } from 'react'
import { BooksContext } from '../context/BookContext'
import { useBooks } from '../hooks/useBooks'

export const Filters: React.FC = () => {
  const { filters, genres } = useBooks()
  const { pages, genre, authorOrTitle } = filters

  const { updateFilterPages, updateFilterGenre, updateFilterAuthorOrTitle } =
    useContext(BooksContext)

  const handleFilterPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    updateFilterPages(Number(event.target.value))
  }

  const handleFilterGenre = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    updateFilterGenre(event.target.value)
  }

  const handleFilterAuthorOrTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    updateFilterAuthorOrTitle(event.target.value)
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2 mb-10 lg:mb-12'>
      <div className='w-full'>
        <label htmlFor='author-title-filter' className='text-lg mb-3 block'>
          Filtrar por título o autor
        </label>
        <input
          id='author-title-filter'
          placeholder='Juego de Tronos'
          className='bg-gray-800 border border-white rounded-lg p-2.5 text-lg w-full'
          onChange={handleFilterAuthorOrTitle}
          value={authorOrTitle}
        />
      </div>
      <div className='w-full'>
        <label htmlFor='genre-filter' className='text-lg mb-3 block'>
          Filtrar por género
        </label>
        <select
          id='genre-filter'
          className='bg-gray-800 border border-white rounded-lg p-2.5 text-lg w-full'
          onChange={handleFilterGenre}
          value={genre}>
          <option value='all' className='text-lg'>
            Todos
          </option>
          {genres.map((item, index) => (
            <option key={index} value={item} className='text-lg'>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className='w-full'>
        <label htmlFor='page-filter' className='text-lg mb-3 block'>
          Filtrar por páginas
        </label>
        <input
          type='range'
          id='page-filter'
          min='0'
          max='1000'
          onChange={handleFilterPage}
          value={pages}
          className='mb-3 w-full'
        />
        <span className='block text-lg'>{filters.pages}</span>
      </div>
    </div>
  )
}
