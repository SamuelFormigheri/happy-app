import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const  Container = styled.View`
    position: absolute;
    top: 0;
    width: 100%;
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #06b3b8;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const  HeaderTitle = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`; 

export const  UserName = styled.Text`
    color: #ffdd00;
    font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity`
`;

export const  UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: #05a2a7;
`;