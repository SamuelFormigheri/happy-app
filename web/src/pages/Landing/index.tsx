import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {FiLogOut} from 'react-icons/fi';

import Logo from '../../assets/icons/logo.svg';

import { Container, ContentWrapper, Main, Location,
  Header, HeaderContent, Profile } from './styles';

import {useAuth} from '../../hooks/AuthContext';

const Landing: React.FC = () => {
  const {signOut, user} = useAuth();
  return (
    <>
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={user.avatar_url ? user.avatar_url : Logo} alt={user.name}/>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile"><strong>{user.name}</strong></Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiLogOut />
          </button>
        </HeaderContent>
      </Header>
      <ContentWrapper>
        <img src={Logo} alt="Happy Logo"/>

        <Main>
            <h1>Leve a felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <Location>
           <strong>Caxias do Sul</strong> 
           <span>Rio Grande do Sul</span>
        </Location>

        <Link to="/map">
          <AiOutlineArrowRight size={26} color="rgba(0,0,0,0.6)"/>
        </Link>

      </ContentWrapper>
    </Container>
    </>);
}

export default Landing;