import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/actions';
import { AsyncStorage } from "react-native";

class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  handleEmail = (e) => {
    this.setState({ email: e })
  }

  handlePassword = (e) => {
    this.setState({ password: e })
  }

  handleSubmit = async () => {
    const { email, password } = this.state;
    if (email.length && password.length) {
      await this.props.login(email, password)
      this.props.navigation.navigate('Product')
      this.setState({
        email: "", password: ""
      })
    } else {
      alert('Please enter email and password')
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', color: 'blue' }}>
          Welcome to HokoSoko
        </Text>
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="email"
          onChangeText={(v) => this.handleEmail(v)}
          value={email}
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(v) => this.handlePassword(v)}
          value={password}
        />
        <View style={{ marginTop: 15 }}>
          <Button
            title="Login"
            onPress={this.handleSubmit}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="SignUp"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    )
  }

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem("token");
    if (user) {
      this.props.navigation.navigate('Product')
    }
  }
}

const mapActions = {
  login: loginUser
}

export default connect(null, mapActions)(Login)
