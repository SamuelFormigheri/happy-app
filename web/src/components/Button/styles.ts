import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
   background: #14cc89;
   color: #fff;
   border-radius: 10px;
   border: 0;
   padding: 0 16px;
   width: 100%;
   height: 56px;
   font-weight: 500;
   margin-top: 16px;
   transition: 280ms;    
   &:hover{
       background: ${shade(0.1, "#FFD666")};
   }       
`;