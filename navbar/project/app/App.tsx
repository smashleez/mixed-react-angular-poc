import React, { } from 'react';
import { Container } from 'reactstrap';
import { RcmNavBar, RcmNavBarSecondary } from './navbar';

const App = (): JSX.Element => {

  return (
      <Container id="app-container">
        <RcmNavBar/>
        {/* <RcmNavBarSecondary/> */}
      </Container>
  );
};

export default App;
