import React, { useCallback, useEffect, useState } from 'react';
import { View, Dimensions, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import mapMarker from '../../assets/map-marker.png';
import api from '../../services/api';

interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

  useEffect(()=>{
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  },[]);

  
  const handleNavigateToDetails = useCallback((id: string)=>{
    navigation.navigate('Orphanage',{id});
  },[]);

  return (
  <View style={{flex: 1}}>
    <MapView 
    provider={PROVIDER_GOOGLE}
    style={{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }} 
    initialRegion={{
      latitude: -29.1858674,
      longitude: -51.1763169,
      latitudeDelta:  0.008,
      longitudeDelta: 0.008
    }} >
      {orphanages.length > 0 && orphanages.map(orphanage => {
        return(
        <Marker key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude
            }}
          >
            <Callout tooltip onPress={() => {handleNavigateToDetails(orphanage.id)}}>
              <View style={{
                width: 160,
                height: 46,
                paddingHorizontal: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 16,
                justifyContent: 'center',
                elevation: 3
              }}> 
              <Text style={{
                color: '#0089a5',
                fontSize: 14,

              }}>
                {orphanage.name}
              </Text>
              </View>
            </Callout>
          </Marker>
        )
      })}

    </MapView>

    <View style={{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 3
    }}>
      <Text style={{
        color: '#8fa7b3'
      }}>
        {orphanages.length > 1 ? `${orphanages.length} orfanatos encontrados` : orphanages.length > 0 ? `${orphanages.length} orfanato encontrado` : `Nenhum orfanato encontrado`}
      </Text>
      <TouchableOpacity onPress={() => {navigation.navigate('SelectMapPosition')}} style={{
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon name="plus" size={20} color="#FFF"/>
      </TouchableOpacity>
    </View>

  </View>);
}

export default Map;