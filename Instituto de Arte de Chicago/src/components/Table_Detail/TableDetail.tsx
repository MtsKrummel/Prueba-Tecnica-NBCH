import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ENDPOINT_ARTWORKS_IMAGE = 'https://www.artic.edu/iiif/2';

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  date_start: number;
  description: string;
}

const artworksEmpty = ["Artista desconocido", "Año desconocido", "Sin descripción"]

interface ArtworkDetailProps {
  open: boolean;
  handleClose: () => void;
  artwork: Artwork | null;
}

export default function ArtworkDetail({ open, handleClose, artwork }:ArtworkDetailProps){
  if (!artwork) return null; // Return null if no artwork is selected

  const imageUrl = `${ENDPOINT_ARTWORKS_IMAGE}/${artwork.image_id}/full/200,/0/default.jpg`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="">{artwork.title}</DialogTitle>

      <DialogContent sx={{ display: 'flex', alignItems: 'flex-start', padding: 2 }}>
        <div style={{ flex: 1, marginRight: 32 }}>
          <LazyLoadImage
            alt={`Artwork by ${artwork.artist_title}`}
            effect="blur"
            src={imageUrl}
            width="100%"
          />
        </div>
        <div className='flex-1'>
          <DialogContentText>
            <strong>Artista:</strong>&ensp;
            {!artwork.artist_title && (artworksEmpty[0])}
            {artwork.artist_title}
            <br />

            <strong>Año:</strong>&ensp;
            {!artwork.date_start && (artworksEmpty[1])}
            {artwork.date_start}
            <br />

            <strong>Descripción:</strong><br />
            {!artwork.description && (
              <p>Sin descripción</p>
            )}
            <div dangerouslySetInnerHTML={{ __html: artwork.description }} />
          </DialogContentText>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
