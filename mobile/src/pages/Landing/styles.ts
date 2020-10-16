import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content:center;
    padding: 0 30px;
`;


export const ButtonContainer = styled.View`
    margin-top: 100px;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const  Button = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background: #14cc89;
    border-radius: 20px;

    justify-content:center;
    align-items: center;
`;

export const Leave = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom:0;
  right: 0;
  background: #07C4C9;
  border-top-width: 1px;
  border-color: #12AFCB;
  padding: 16px 0 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`; 

export const LeaveText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 12px;
`; 