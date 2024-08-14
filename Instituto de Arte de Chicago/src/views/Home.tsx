import { lazy, useContext } from "react"
import { ArtworksContext } from "../context/ArtworksContext"
import SkeletonComponent from "../components/Skeleton/Skeleton"

const ArtworksTable = lazy(() => import('../components/Table'))

export default function Home() {
  const context = useContext(ArtworksContext)
  const { isLoading } = context

  return (
    <main className='mt-10'>
      <h2 className='flex text-3xl font-bold text-center mb-5'>
        Lista de obras
      </h2>
      {
        isLoading && <SkeletonComponent />
      }
      <ArtworksTable />
    </main>
  )
}
