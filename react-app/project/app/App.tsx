import React, { useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import Spaces from '@availity/spaces';
import PageHeader from '@availity/page-header';
import qs from 'query-string';
import { RemitsList } from './areas';

const App = (): JSX.Element => {
  const { search } = useLocation();


  return (
    <Container id="app-container">
      <Switch>
        <Route exact path="/my-app-1">
          <RemitsList />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
