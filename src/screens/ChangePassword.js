import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native';
import { changePassword } from '../redux/actions/actions';
import { connect } from 'react-redux';

class ChangePassword extends Component {

  state = {
    oldPassword: "",
    newPassword: ""
  }

  handleFeildChange = (field, value) => {
    console.log(field, value)
    this.setState({
      [field]: value
    })
  }

  handleSubmit = () => {
    const { oldPassword, newPassword } = this.state;
    this.props.changePassword(oldPassword, newPassword)
    // if (oldPassword.length && newPassword.length > 2) {
    // } else if (newPassword.length <= 2) {
    //   alert('Password must be atleast 6 chars')
    // }
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', color: 'blue' }}>
          Change password
        </Text>
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }}
          placeholder="Old password!"
          onChangeText={(v) => this.handleFeildChange('oldPassword', v)}
        />
        <TextInput style={{ height: 40, padding: 6, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 9 }} placeholder="New password"
          onChangeText={(v) => this.handleFeildChange('newPassword', v)}
        />
        <View style={{ marginTop: 15 }}>
          <Button
            title="Submit"
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    )
  }
}

const mapActions = {
  changePassword: changePassword
}

export default connect(null, mapActions)(ChangePassword)