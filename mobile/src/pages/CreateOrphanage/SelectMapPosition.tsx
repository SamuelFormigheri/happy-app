import React, { useCallback, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../assets/map-marker.png';

interface IPosition{
  latitude: number;
  longitude: number;
}

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState<IPosition>({latitude: 0, longitude: 0});

  const handleSelectMapPosition = useCallback((event: MapEvent)=>{
    setPosition(event.nativeEvent.coordinate);
  },[]);

  return (
    <View style={{
      flex: 1,
      position: 'relative'
    }}>
      <MapView 
        initialRegion={{
          latitude: -29.1851862,
          longitude: -51.1770326,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && position.longitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && position.longitude !== 0 && (
        <RectButton style={{
          backgroundColor: '#15c3d6',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          height: 56,
        
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 40
        }} onPress={()=>{navigation.navigate('Create', {position})}}>
          <Text style={{
            fontFamily: 'RobotoSlab-Medium',
            fontSize: 16,
            color: '#FFF'
          }}>Próximo</Text>
        </RectButton>
      )}
      
    </View>
  );
}


export default SelectMapPosition;