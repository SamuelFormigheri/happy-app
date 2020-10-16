import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import api from '../../services/api';
import { Container, HeaderTitle, UserName, ProfileButton, UserAvatar} from './styles';
import { useAuth } from '../../hooks/AuthContext';

const Header: React.FC = () => {
    const { user, updateUser } = useAuth();
    const handleUpdateAvatar = useCallback(()=>{
        ImagePicker.showImagePicker({
          title:'Selecione um Avatar',
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
            const data = new FormData();
            data.append('avatar',{
              type: 'image/jpg',
              name: `${user.id}-profilepic.jpg`,
              uri: response.uri
            });
    
            api.patch('users/avatar', data).then((resp)=>{
              updateUser(resp.data);
            }).catch(error => console.log(error));
          });
      },[updateUser, user.id]);
      
  return (
    <Container>
        <HeaderTitle>
        Bem vindo, {"\n"}
        <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
    </Container>
  );
}

export default Header;