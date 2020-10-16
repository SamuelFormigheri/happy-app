import React from 'react';

import Routes from './routes/index';
import GlobalProvider from './hooks/Global';
import Global from './styles/global';

function App() {
  return (
    <>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
      <Global />
    </>
  );
}

export default App;
