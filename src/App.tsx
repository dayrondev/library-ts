import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import { ReadList } from './components/ReadList'

const App: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <main className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-full'>
          <div className='w-full lg:w-2/3 p-4'>
            <div className='flex flex-col p-4'>
              <Header />
              <Filters />
              <ProductList />
            </div>
          </div>
          <ReadList />
        </div>
      </main>
    </div>
  )
}

export default App
