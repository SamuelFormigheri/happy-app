import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface IRouteParams{
  position: {
    latitude: number;
    longitude: number;
  }
}
interface IFormSubmitContent{
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
}

const Create: React.FC = () => {
  const route = useRoute();
  const params = route.params as IRouteParams;
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const[open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = useCallback(async(data: IFormSubmitContent)=>{
    try
    {
      formRef.current?.setErrors({});

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
      form.append('latitude', String(params.position.latitude));
      form.append('longitude', String(params.position.longitude));
      form.append('open_on_weekends', String(open_on_weekends));

      images.forEach((image, index)=>{
        form.append('images', {
          type: 'image/jpg',
          name: `image_${index}.jpg`,
          uri: image
        });
      });

      await api.post('orphanages', form);

      navigation.navigate('Landing');
      Alert.alert('Cadastrado com Sucesso', 'Orfanato Cadastrado.');
    }
    catch(err)
    {
     if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
     }
      Alert.alert('Erro no Cadastro', 'Verifique os campos e tente novamente...')
    }
  },[navigation, images, open_on_weekends]);

  const handleSelectImages = useCallback(()=>{
    ImagePicker.showImagePicker({
      title:'Adicionar uma Foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Câmera',
      chooseFromLibraryButtonTitle: 'Escolher da Galeria'
    },
      response => {
        if (response.didCancel) 
          return;
        if (response.error) {
          Alert.alert('Erro', 'Erro ao atualizar avatar...'); 
          return;
        } 
        setImages([...images, response.uri]);
      });
  },[images]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Form ref={formRef} onSubmit={handleSubmit} style={{width: '100%'}}>
        <Text style={styles.title}>Dados</Text>

        <Text style={styles.label}>Nome</Text>
        <Input name="name" icon="align-justify" placeholder="Nome"/>

        <Text style={styles.label}>Sobre</Text>
        <Input name="about" icon="align-justify" placeholder="Sobre" style={{ height: 110 }} multiline/>

        {/* <Text style={styles.label}>Whatsapp</Text>
        <TextInput
          style={styles.input}
        /> */}

        <Text style={styles.label}>Fotos</Text>
        <View style={styles.uploadedImagesContainer}>
          {images.length > 0 && images.map(image => {
            return(
              <Image 
                key={image}
                source={{uri: image}}
                style={styles.uploadedImage}
              />
            )
          })}
        </View>
        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
          <Icon name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>

        <Text style={styles.title}>Visitação</Text>

        <Text style={styles.label}>Instruções</Text>
        <Input name="instructions" icon="list" placeholder="Instruções" style={{ height: 110 }} multiline/>

        <Text style={styles.label}>Horario de visitas</Text>
        <Input name="opening_hours" icon="clock" placeholder="Horário de Visitas"/>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Atende final de semana?</Text>
          <Switch 
            thumbColor="#fff" 
            trackColor={{ false: '#ccc', true: '#39CC83' }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        </View>

        <RectButton style={styles.nextButton} onPress={()=>formRef.current?.submitForm()}>
          <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      </Form>
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'RobotoSlab-Medium',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'RobotoSlab-Regular',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 16,
    color: '#FFF',
  }
});

export default Create;