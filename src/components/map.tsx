interface Props {
  readonly longitude: string;
  readonly latitude: string;
  readonly mapWidth: string;
  readonly mapHeight: string;
}

const Map = ({ longitude, latitude, mapHeight, mapWidth }: Props) => {

  const zoom = "14";
  const url = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_GOOGLE_MAPS_API_KEY as string}&q=${latitude.toString()},${longitude.toString()}&zoom=${zoom}`;

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