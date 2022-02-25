import { Marker, Popup, TileLayer } from "react-leaflet";

import { Container } from "./styles";

const ContactMap = () => {
  return (
    <div>
      <Container center={[46.20793, 6.1307242]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[46.20793, 6.1307242]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Container>
    </div>
  );
};

export default ContactMap;
