import React, { createContext, useState, useEffect, ReactNode, Dispatch } from 'react';
import getData from '../services/getArtWorks';

// Interfaces
interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  date_start: number;
  description: string;
}

interface ArtworksContextType {
  isLoading: boolean;
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  validArtWorks: Artwork[];
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<React.SetStateAction<number>>;
  open: boolean;
  selectedArtwork: Artwork | null;
  handleClickOpen: (artwork: Artwork) => void;
  handleClose: () => void;
}

// Creación de contexto
export const ArtworksContext = createContext<ArtworksContextType | undefined>(undefined);

export const ArtworksProvider = ({ children }: { children: ReactNode }) => {
  // Estados
  const [search, setSearch] = useState<string>('');
  const [validArtWorks, setValidArtWorks] = useState<Artwork[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mostrar detalle
  const [open, setOpen] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Maneja la apertura del modal con los detalles de la obra
  const handleClickOpen = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setOpen(true);
  };

  // Cierra el modal y resetea la obra seleccionada
  const handleClose = () => {
    setOpen(false);
    setSelectedArtwork(null);
  };

  // Trae los datos de las obras y filtra imagenes invalidas
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getData();
        if (data) {
          setValidArtWorks(data.filter((artwork) => artwork !== null) as Artwork[]);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <ArtworksContext.Provider
      value={{
        isLoading,
        search,
        validArtWorks,
        page,
        rowsPerPage,
        open,
        selectedArtwork,
        setSearch,
        setPage,
        setRowsPerPage,
        handleClickOpen,
        handleClose,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};
