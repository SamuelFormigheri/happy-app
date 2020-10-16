import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  > header{
      width: 100%;
      height: 144px;
      background: #18BDCD;

      display: flex;
      align-items: center;
      
      div{
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;

          svg{
              color: #FFF;
              width: 28px;
              height: 28px;
              transition: 200ms;
              &:hover{
                  color: #ccc;
              }
          }
      }
  }
`;

export const Content = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    margin: -120px auto;
    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display:flex;
        flex-direction:column;

        h1{
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        a{
            color: #FFF;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: 280ms;
            &:hover{
               color: ${shade(0.2, "#FFF")}
           }
        }
    }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position:relative;
  align-self:center;
  img{
      width: 186px;
      height: 186px;
      border-radius: 50%;
      background-color:  #05a2a7;
  }
  label{
      position:absolute;
      width: 48px;
      height: 48px;
      background: #FFD666;
      border-radius: 50%;
      right: 0;
      bottom: 0;
      border: 0;
      transition: 200ms;
      cursor: pointer;
      display:flex;
      align-items:center;
      justify-content:center;

      input{
          display:none;
      }
      svg{
          width: 20px;
          height: 20px;
          color: #FFF;
      }
      &:hover { 
          background: ${shade(0.2, '#FFD666')};
      }
  }
`;