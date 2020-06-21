import React from 'react';
// import NavigationService from './src/routes/NavigationService';
import AppContainer from './src/routes/routeIndex';
import { getAuth } from './src/redux/actions/actions';

class Core extends React.Component {
  state = {
    authed: false
  }
  render() {
    return (
      <AppContainer />
    );
  }

}

export default Core

