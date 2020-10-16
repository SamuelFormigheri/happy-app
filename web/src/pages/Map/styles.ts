import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;

  > a{
      position: absolute;
      right: 40px;
      bottom: 40px;

      width: 64px;
      height: 64px;
      background: #15c3d6;
      border-radius: 20px;

      display:flex;
      justify-content:center;
      align-items: center;

      transition: 200ms;

      z-index: 10;

      &:hover{
        background: #17d6eb;
      }
  }
  .leaflet-container{
    z-index: 5;

    .map-popup .leaflet-popup-content-wrapper{
      background: rgba(255,255,255,0.8);
      border-radius: 20px;
    }
    .map-popup .leaflet-popup-content{
      color: #0089a5;
      font-size: 18px;
      font-weight: bold;
      margin: 8px 12px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .map-popup .leaflet-popup-content a{
        width: 40px;
        height: 40px;
        background: #15c3d6;
        border-radius: 12px;
        box-shadow: 17.28px 27.65px 41.48px rgba(23, 142, 166, 0.16);
        transition: 200ms;
        
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background: #17d6eb;
        }
    }

    .map-popup .leaflet-popup-tip-container{
      display:none;
    }

  }
`;


export const Aside = styled.div`
    width: 440px;
    background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2{
        font-size: 48px;
        font-weight: 800;
        line-height: 42px;
        margin-top: 64px;
    }

    p{
        line-height: 28px;
        margin-top: 24px;
    }

    footer{
        display: flex;
        flex-direction: column;
        line-height: 24px;

        strong{
            font-weight: 800;
        }
    }
`;