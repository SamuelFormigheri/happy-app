import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiFileText, FiPlus, FiAlignJustify, FiClock } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import SideBar from '../../components/SideBar';
import mapIcon from '../../utils/MapIcon';
import getValidationErrors from "../../utils/getValidationErrors";
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

import './styles.css';
import api from "../../services/api";

interface IFormSubmitContent{
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
}


export default function CreateOrphanage() {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory(); 
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    if(!event.target.files)
      return;

    const selectedImages = Array.from(event.target.files);
    setImages([...images, ...selectedImages]);
    const previewSelectedImages = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages([...previewImages, ...previewSelectedImages]);
  },[images, previewImages]);

  const handleMapClick = useCallback((event: LeafletMouseEvent)=> {
    setPosition({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
  },[]);

  const handleSubmit = useCallback(async(data: IFormSubmitContent)=> {
    try{
      if(position.latitude === 0 && position.longitude === 0)
        return;

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é Obrigatório.'),
        about: Yup.string().required('Sobre é Obrigatório.'),
        instructions: Yup.string().required('Instruções é obrigatório'),
        opening_hours: Yup.string().required('Horário de Funcionamento é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });
      
      const form = new FormData();

      form.append('name', data.name);
      form.append('about', data.about);
      form.append('instructions', data.instructions);
      form.append('opening_hours', data.opening_hours);
      form.append('latitude', String(position.latitude));
      form.append('longitude', String(position.longitude));
      form.append('open_on_weekends', String(open_on_weekends));
      images.forEach(image=>{
        form.append('images', image);
      });

      await api.post('orphanages', form);

      history.push('/map');
    }
    catch(err)
    {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
    }
  },[history, images, open_on_weekends, position]);

  return (
    <div id="page-create-orphanage">

      <SideBar />

      <main>
        <Form ref={formRef} onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-29.1851862,-51.1770326]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              {position.latitude !== 0 && position.longitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <Input name="name" icon={FiFileText} placeholder="Nome"/>
            <Textarea name="about" icon={FiAlignJustify} placeholder="Sobre (Máximo de 300 caracteres)"/>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.length > 0 && previewImages.map(image => {
                  return(
                    <img key={image} src={image} alt="Imagens Carregadas"/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages}type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <Textarea name="instructions" icon={FiAlignJustify} placeholder="Instruções"/>

            <Input name="opening_hours" icon={FiClock} placeholder="Horário de Funcionamento"/>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ""} onClick={()=>{setOpenOnWeekends(true)}}>Sim</button>
                <button type="button" className={open_on_weekends ? "" : "active"} onClick={()=>{setOpenOnWeekends(false)}}>Não</button>
              </div>
            </div>
          </fieldset>

          <Button type="submit">Confirmar</Button>
        </Form>
      </main>
    </div>
  );
}
