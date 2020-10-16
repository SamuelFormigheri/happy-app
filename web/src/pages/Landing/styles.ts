import styled from 'styled-components';
import Landing from '../../assets/icons/landing.svg';
import { shade } from 'polished';

export const Container = styled.div`
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  position: relative;
`;

export const ContentWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;

    height: 100%;
    max-height: 680px;

    display: flex;
    align-items: flex-start;
    flex-direction:column;
    justify-content:space-between;

    background: url(${Landing}) no-repeat 80% center;
    a{
        position: absolute;
        right: 0;
        bottom: 0; 

        width: 80px;
        height: 80px;
        background: #ffd666;

        border-radius: 30px;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: 200ms;
        &:hover{
            background: #96feff;
        }
    }
`;

export const  Main = styled.main`
    max-width: 350px;

    h1{
       font-size: 76px;
       font-weight: 900;
       line-height: 70px;
    }
    p{
        margin-top: 40px;
        font-size: 24px;
        line-height: 34px;
    }
`;

export const  Location = styled.div`
    position: absolute;
    right: 0;
    top: 0;

    font-size: 24px;
    line-height: 34px;
    display: flex;
    flex-direction:column;
    text-align:right;

    strong{
       font-weight: 800; 
    }
`;


export const Header = styled.header`
    position: absolute;
    top: 0;
    width: 100%;
    padding: 12px 0 12px 0;
    background: #06b3b8;
`;

export const  HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    button {
        margin-left: auto;
        background: transparent;
        border: 0;
        transition: 200ms;
        svg{
            color: #FFF;
            width: 20px;
            height: 20px;
        }
        &:hover{
          svg{
            color: #CCC;
          }
        }
    }
`;

export const  Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color:  #05a2a7;
    }

    div{
        display:flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;
    }
    span{
        color: #FFFFFF;
    }

    strong{
        color: #ffdd00;
        transition: 200ms;
        &:hover{
            color: ${shade(0.2, '#ffdd00')}
        }
    }
    a{
        text-decoration:none;
    }
`;