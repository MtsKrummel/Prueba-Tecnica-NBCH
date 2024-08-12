import React, { createContext, useState, useEffect, ReactNode, Dispatch } from 'react';

const ENDPOINT_ARTWORKS = 'https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_start,description&page=1&limit=100';
const ENDPOINT_ARTWORKS_IMAGE = 'https://www.artic.edu/iiif/2';

//Interfaces
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
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  selectedArtwork: Artwork | null;
  handleClickOpen: (artwork: Artwork) => void;
  handleClose: () => void;
}

//Validar si hay imagen
const isValidImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

//Creación de contexto
export const ArtworksContext = createContext<ArtworksContextType | undefined>(undefined);

export const ArtworksProvider = ({ children }: { children: ReactNode }) => {
  //Estados
  const [search, setSearch] = useState('');
  const [validArtWorks, setValidArtWorks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true)

  // Mostrar detalle
  const [open, setOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleClickOpen = (artwork) => {
    setSelectedArtwork(artwork);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArtwork(null);
  };

  // Feching de datos
  const getData = async () => {
    try {
      const response = await fetch(ENDPOINT_ARTWORKS);
      const data = await response.json();
      const artworks = data.data;

      // Verificamos que las imagenes sean validas
      const validArtworks = await Promise.all(artworks.map(async (artwork: Artwork) => {
        //obtenemos imagen
        const imageUrl = `${ENDPOINT_ARTWORKS_IMAGE}/${artwork.image_id}/full/843,/0/default.jpg`;

        // validamos
        const isValid = await isValidImage(imageUrl);
        return isValid ? artwork : null;
      }));

      // Filtramos las imagenes
      setValidArtWorks(validArtworks.filter((artwork) => artwork !== null) as Artwork[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
        handleClose 
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};