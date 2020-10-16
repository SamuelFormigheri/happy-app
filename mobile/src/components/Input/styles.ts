import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
  isError: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #F5F8FA;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px; 
  border-color: #D3E2E5;
  color: #8fa7b3;

  ${props => props.isError && css`
    border-color: #c53030;
  `}
  ${props => props.isFocused && css`
    border-color: #5C8599;
  `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #8fa7b3;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 18px;
    color: #8fa7b3;
`;