import styled, {keyframes} from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: center;
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
`;

export const Content = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    width: 100%;
    max-width: 700px;
`;

const appearFromLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }to{
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    place-content: center;

    animation: ${appearFromLeft} 1s;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            margin-bottom: 24px;
        }

        a{
            color: #3a3a3a;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: 280ms;
            &:hover{
               color: ${shade(0.2, "#F4EDE8")}
           }
        }
    }
    > a{
        color: #5636d3;
        display: flex;
        align-items: center;
        margin-top: 24px;
        text-decoration: none;
        transition: 280ms;

        svg{
            margin-right: 16px;
        }
        &:hover{
            color: ${shade(0.2, "#FF9000")}
        }
    }
`;