import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { AsyncStorage } from "react-native";
import Axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/actions';

class Profile extends Component {

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
    AsyncStorage.clear()
    this.props.handleLogout()
    this.props.navigation.navigate('Login')
  }

  handleProfile = () => {
    const { FirstName, LastName, Address, City, Country, State, Pincode, Mobile } = this.state;
    const newUser = {
      FirstName, LastName, Address, City,
      Country, State, Pincode, Mobile
    }
    AsyncStorage.getItem('token').then(token => {
      AsyncStorage.setItem("user", JSON.stringify(newUser)).then(data => {
        // call action
        Axios.post(`http://mrtapi.hokosoko.com/buyer.svc/Updateprofile?buyerid=${token}&fname=${FirstName}&lname=${LastName}&address=${Address}&city=${City}&country=${Country}&state=${State}&pin=${Pincode}&mobile=${Mobile}`)
          .then(() => alert('profile updated!'))
      })
    })
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

  componentDidMount = () => {
    AsyncStorage.getItem("user").then(receivedUser => {
      const user = JSON.parse(receivedUser)
      console.log(receivedUser);
      if (user) {
        this.setState({
          FirstName: user.FirstName, LastName: user.LastName,
          Address: user.Address, City: user.City, Country: user.Country,
          State: user.State, Pincode: user.Pincode, Mobile: user.Mobile
        })
      }
    }
    );
  }
}

const mapActions = {
  handleLogout: logoutUser
}

export default connect(null, mapActions)(Profile)
