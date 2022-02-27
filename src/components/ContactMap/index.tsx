import { Marker, Popup, TileLayer } from "react-leaflet";

import { Container } from "./styles";

const ContactMap = () => {
  const positionMarker = {
    lat: 46.9479867,
    lon: 7.4573579,
  };

  return (
    <>
      <Container center={[positionMarker.lat, positionMarker.lon]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        />
        <Marker position={[positionMarker.lat, positionMarker.lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Container>
    </>
  );
};

// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

export default ContactMap;
