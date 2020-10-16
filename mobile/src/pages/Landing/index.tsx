import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logotipoImg from '../../assets/logotipo.png';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/AuthContext';

import { Container, ButtonContainer, Button, Leave, LeaveText } from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  return (
      <>
        <Header/>
        <Container>
            <Image source={logotipoImg} style={{marginTop: 40}}/>
            <ButtonContainer>
                <Button onPress={()=>{navigation.navigate('Map')}}>
                    <Icon name="map" size={28} color="#FFFFFF"/>
                </Button>
                <Button onPress={() => {navigation.navigate('SelectMapPosition')}}>
                    <Icon name="plus" size={28} color="#FFFFFF"/>
                </Button>
            </ButtonContainer>
            <Leave onPress={signOut}>
                <Icon name="log-out" size={20} color="#FFFFFF"/>
                <LeaveText>Sair</LeaveText>
            </Leave>
        </Container>
      </>
  );
}

export default Landing;