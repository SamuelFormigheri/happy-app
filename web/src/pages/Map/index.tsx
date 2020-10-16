import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import { Map as MapLeaflet, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarker from '../../assets/icons/map-marker.svg';
import { Container, Aside } from './styles';
import 'leaflet/dist/leaflet.css';

import mapIcon from '../../utils/MapIcon';
import api from '../../services/api';

interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(()=>{
    api.get('orphanages').then(response=>{
      setOrphanages(response.data);
    });
  },[]);


  return (
  <Container>
      <Aside>
        <header>
            <img src={mapMarker} alt="Map Marker"/>
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
            <strong>Caxias do Sul</strong>
            <span>Rio Grande do Sul</span>
        </footer>
      </Aside>

        <MapLeaflet center={[-29.1851862,-51.1770326]} zoom={15} 
        style={{ width: '100%', height: '100%'}}>
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

          {orphanages.length > 0 && orphanages.map(orphanage => {
            return(
              <Marker key={orphanage.id}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={260} className="map-popup">
                  {orphanage.name}
                  <Link to={`orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFF"/>
                  </Link>
                </Popup>
              </Marker>
            );
          })}

        </MapLeaflet>

      <Link to="/orphanages/create"><FiPlus size={32} color="#FFF"/></Link>
  </Container>);
}

export default Map;