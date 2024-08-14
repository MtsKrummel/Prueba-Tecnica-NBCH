const ENDPOINT_ARTWORKS = 'https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_start,description&page=1&limit=100';
const ENDPOINT_ARTWORKS_IMAGE = 'https://www.artic.edu/iiif/2';

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  date_start: number;
  description: string;
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

export default async function getData(){

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

    return validArtworks
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};