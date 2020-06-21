import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { AsyncStorage } from "react-native";

export default class Profile extends Component {

  state = {
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
    Country: "",
    State: "",
    Pincode: "",
    Mobile: ""

  }

  handleFeildChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }
  handleLogout = () => {
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }
  handleProfile = () => {

  }
  render() {
    const { FirstName, LastName, Address, City, Country, State, Pincode, Mobile } = this.state;

    return (
      <View>
        <View style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center', color: 'blue' }}>UPDATE PROFILE</Text>
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="First Name"
            onChangeText={(v) => this.handleFeildChange('fNFirstNameame', v)} value={FirstName} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="Last Name"
            onChangeText={(v) => this.handleFeildChange('LastName', v)} value={LastName} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="Address"
            onChangeText={(v) => this.handleFeildChange('Address', v)} value={Address} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="City"
            onChangeText={(v) => this.handleFeildChange('City', v)} value={City} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="Country"
            onChangeText={(v) => this.handleFeildChange('Country', v)} value={Country} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="State"
            onChangeText={(v) => this.handleFeildChange('State', v)} value={State} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            keyboardType='numeric'
            placeholder="Pincode"
            onChangeText={(v) => this.handleFeildChange('Pincode', v)} value={Pincode} />
          <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
            placeholder="Mobile"
            keyboardType='numeric'
            onChangeText={(v) => this.handleFeildChange('Mobile', v)} value={Mobile} />
          <View style={{ marginTop: 15 }}>
            <Button
              title="Update Profile"
              onPress={this.handleProfile}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title="logout" onPress={this.handleLogout} />
          </View>
        </View>
      </View>
    )
  }
}
