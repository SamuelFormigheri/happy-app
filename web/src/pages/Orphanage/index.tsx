import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import SideBar from '../../components/SideBar';
import api from "../../services/api";
import mapIcon from '../../utils/MapIcon';
import './styles.css';

interface IImage{
  id: string;
  url: string;
}

interface IOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: string;
  images: IImage[];
}

interface IRouteParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<IRouteParams>();
  const [orphanage, setOrphanage] = useState<IOrphanage>();
  const [imageSelected, setImageSelected] = useState(0);

  useEffect(()=>{
    api.get(`orphanages/${params.id}`).then(response=>{
      setOrphanage(response.data);
    });
  },[params.id]);
  
  return (
    <div id="page-orphanage">
      
      <SideBar />
      
      <main>
        {!orphanage ? (<p>Carregando...</p>) : (
          <div className="orphanage-details">
            {orphanage.images.length && (
              <img key={orphanage.images[imageSelected].id} src={orphanage.images[imageSelected].url} alt={orphanage.name} />
            )}

            <div className="images">
            {orphanage.images.length > 0 && orphanage.images.map((image, index) => {
              return(
                <button key={image.id} className={imageSelected === index ? "active" : ""} type="button" onClick={() => {setImageSelected(index)}}>
                  <img src={image.url} alt={orphanage.name} />
                </button>
              )
            })}
            </div>
            
            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <div className="map-container">
                <Map 
                  center={[orphanage.latitude , orphanage.longitude]} 
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                  />
                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude , orphanage.longitude]} />
                </Map>

                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </div>
                {orphanage.open_on_weekends ? (
                  <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
                ):(
                  <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
                )}
              </div>

              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                <a href={`https://wa.me/${orphanage.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-button">Entrar em contato</a>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}