import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store'
import Core from './Core';
import NavigationService from './src/routes/NavigationService'
class App extends React.Component {
  state = {
    authed: false
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: 20 }}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        >
          <Core />
        </View>
      </Provider>
    );
  }
}
export default App

