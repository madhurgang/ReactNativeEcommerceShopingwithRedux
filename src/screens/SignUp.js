import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/actions'

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    residence: ""
  }

  handleFeildChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  handleRegister = async () => {
    const { email, mobile_number, password, name, residence } = this.state;
    if (email.length && mobile_number.length && password.length && name.length) {
      // call action here
      await this.props.registerUser(name, email, password, mobile_number, residence)
      this.props.navigation.navigate('Login')
    } else {
      alert('Please fill all the required fields!')
    }
  }

  render() {
    const { email, mobile_number, residence, password, name } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', color: 'blue' }}>SIGN UP</Text>
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="name"
          value={name}
          onChangeText={(v) => this.handleFeildChange('name', v)}
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="email"
          onChangeText={(v) => this.handleFeildChange('email', v)}
          value={email}
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="Mobile Number"
          onChangeText={(v) => this.handleFeildChange('mobile_number', v)}
          value={mobile_number}
          keyboardType='numeric'
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="residence"
          onChangeText={(v) => this.handleFeildChange('residence', v)}
          value={residence}
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="password"
          onChangeText={(v) => this.handleFeildChange('password', v)}
          value={password}
        />
        <View style={{ marginTop: 15 }}>
          <Button
            title="Register"
            onPress={this.handleRegister}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }
}
const mapAction = {
  registerUser: registerUser
}

export default connect(null, mapAction)(SignUp)
