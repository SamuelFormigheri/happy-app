import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title } from './styles';

interface IHeaderProps{
    title: string;
    showCancel?: boolean; 
}

const HeaderCreate: React.FC<IHeaderProps> = ({title, showCancel = true}) => {
  const navigation = useNavigation();
  return (
      <Container>
          <BorderlessButton onPress={navigation.goBack}>
              <Icon name="arrow-left" size={24} color="#15b6d6"/>
          </BorderlessButton>
          
          <Title>{title}</Title>

          {showCancel ? (
            <BorderlessButton onPress={()=>{navigation.navigate('Landing')}}>
                <Icon name="x" size={24} color="#ff669d"/>
            </BorderlessButton>
          ): <View />}

      </Container>
  );
}

export default HeaderCreate;