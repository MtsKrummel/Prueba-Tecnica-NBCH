import { useContext } from 'react';

import { ArtworksContext } from '../../context/ArtworksContext';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ArtworkDetail from '../Table_Detail';
import Search from '../Search';
import SkeletonComponent from '../Skeleton/Skeleton';


const ENDPOINT_ARTWORKS_IMAGE = 'https://www.artic.edu/iiif/2';

export default function ArtworksTable(){
  const context = useContext(ArtworksContext);

  if (!context) {
    return null; // or some fallback UI
  }

  const { isLoading, search, setSearch, validArtWorks, page, setPage, rowsPerPage, setRowsPerPage, open, selectedArtwork, handleClickOpen, handleClose } = context;

  // Search function
  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter data based on search
  const filteredArtWorks = !search
    ? validArtWorks
    : validArtWorks.filter((value) =>
        value.title.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
    {
      isLoading && (
        <SkeletonComponent />
      )
    }
    <div>
      {/* buscador */}
      <Search 
        search={search}
        searcher={searcher}
      />

      {/* contenido */}
      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Artista</TableCell>
                <TableCell>Año</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredArtWorks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((artwork) => (
                <TableRow key={artwork.id} hover role="checkbox" tabIndex={-1} onClick={() => handleClickOpen(artwork)}>
                  <TableCell>
                    <LazyLoadImage
                      alt={`Artwork by ${artwork.artist_title}`}
                      className="gallery-img"
                      effect="blur"
                      src={`${ENDPOINT_ARTWORKS_IMAGE}/${artwork.image_id}/full/200,/0/default.jpg`}
                      width="100%"
                    />
                  </TableCell>
                  <TableCell>{artwork.title}</TableCell>
                  <TableCell>{artwork.artist_title}</TableCell>
                  <TableCell>{artwork.date_start}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* paginación */}
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredArtWorks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
            window.scrollTo(0, 0); // Scroll to the top of the page
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
            window.scrollTo(0, 0); // Scroll to the top of the page
          }}
        />
      </Paper>

      <ArtworkDetail open={open} handleClose={handleClose} artwork={selectedArtwork} />
    </div>
    </>
  );
};
