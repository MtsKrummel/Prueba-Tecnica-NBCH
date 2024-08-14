import './App.css'
import { Suspense } from 'react'

import { ArtworksProvider } from './context/ArtworksContext'

import { Typography } from '@mui/material'
import Home from './views/Home'

function App() {
  
  return (
    <ArtworksProvider>
      <Suspense>
        <header className='relative h-[500px]'>
          <img
            className='absolute inset-0 w-full h-full object-cover opacity-20'
            src="/images/bg-img.jpg"
            alt="background img"
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
            <Typography variant='h2'>Prueba Técnica</Typography>
            <p className='opacity-70'>SPA React - Instituto de Arte de Chicago</p>
            <i className='font-extralight text-red-300 mt-2 opacity-70'>Hecho por Krummel Matias</i>
          </div>
        </header>

        <Home />
      </Suspense>
    </ArtworksProvider>
  )
}

export default App
