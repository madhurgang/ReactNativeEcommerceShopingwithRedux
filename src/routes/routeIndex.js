import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Product from '../screens/Product';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ChangePassword from '../screens/ChangePassword';
import Profile from '../screens/Profile';

const TopLevelNavigator = createBottomTabNavigator(
  {
    Product: {
      screen: Product
    },
    Profile: { screen: Profile },
    ChangePassword: { screen: ChangePassword }

  }, {
  initialRouteName: "Product"
}
);

const SwitchNav = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp,
  Product: TopLevelNavigator
})

const AppContainer = createAppContainer(SwitchNav);

export default AppContainer;