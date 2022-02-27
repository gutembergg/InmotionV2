import { Marker, Popup, TileLayer } from "react-leaflet";

import { Container } from "./styles";

const ContactMap = () => {
  return (
    <>
      <Container center={[46.20793, 6.1307242]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        />
        <Marker position={[46.20793, 6.1307242]}>
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
