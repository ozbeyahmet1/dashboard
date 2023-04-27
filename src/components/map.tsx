

interface Props {
  readonly longitude: string;
  readonly latitude: string;
  readonly mapWidth: string;
  readonly mapHeight: string;
}

const Map = ({ longitude, latitude, mapHeight, mapWidth }: Props) => {
  const GOOGLE_API_KEY = process.env.NEXT_GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_API_KEY) {
    throw new Error("Google Maps Api key not found in environment variables.");
  }
  const zoom = "14";
  const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${latitude.toString()},${longitude.toString()}&zoom=${zoom}`;

  return (
    <iframe
      title="Map"
      width={mapWidth}
      height={mapHeight}
      style={{ border: 0 }}
      src={url}
      allowFullScreen
    ></iframe>
  );
};

export default Map;
