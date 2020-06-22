import axios from 'axios';
import { API_URL } from '../../Constants/Constants';
import NavigationService from '../../routes/NavigationService';
import { AsyncStorage } from "react-native";

export const loginUser = (email, password) => {
  return dispatch => {
    const url = `${API_URL}/BuyerLogin?email=${email}&password=${password}`
    axios.post(url)
      .then(data => {
        console.log(data.data)
        if (!data.data.BuyerId) {
          alert('User not found!')
          return dispatch({
            type: 'INVALID_USER'
          })
        }
        AsyncStorage.setItem("token", data.data.BuyerId)
          .then(() => {
            AsyncStorage.setItem("user", JSON.stringify(data.data))
              .then(() => {
                NavigationService.navigate('Product')
              })
              .catch(err => console.log(err))
          }).catch(err => console.log(err));
        return dispatch({
          type: 'LOGIN_USER',
          payload: data.data
        })
      })
      .catch(err => console.log(err))
  }
}

export const logoutUser = () => ({
  type: 'LOGOUT'
})

export const getProducts = () => {
  return dispatch => {
    const url = `${API_URL}/GetProductList?pageurl=all&searchkeywords=0&min=0&max=1-500000&color=0&size=0&sortby=bestselling&recordFrom=1&recordTo=30&textlenght=0&showcolor=1&selleruniquecode=0`
    axios.post(url)
      .then(data => {
        console.log(data.data)
        return dispatch({
          type: 'LIST_PRODUCTS',
          payload: data.data.ProductList
        })
      })
      .catch(err => console.log(err))
  }
}

export const registerUser = (name, email, password, mobile, residence) => {
  console.log(name, email, password, mobile, residence)
  const slug = residence
    ? `BuyerRegistration?name=${name}&email=${email}&mobile=${mobile}&password=${password}&residence=${residence}`
    : `BuyerRegistration?name=${name}&email=${email}&mobile=${mobile}&password=${password}`
  return dispatch => {
    const url = `${API_URL}/${slug}`
    axios.post(url)
      .then(data => {
        if (data.data.StatusCode === "1") {
          //  NavigationService.navigate('Login')
          return dispatch({
            type: 'REGISTER_USER',
            payload: data.data
          })
        } else {
          alert('Could not create user!')
          return dispatch({
            type: 'REGISTER_USER_FAIL',
            payload: data.data
          })
        }
      })
      .catch(err => console.log(err))
  }
}

export const changePassword = (oldPassword, newPassword) => {
  return dispatch => {
    AsyncStorage.getItem("token")
      .then(token => {
        const slug = `ChangePassword?buyerid=${token}&OldPassword=${oldPassword}&NewPassword=${newPassword}`
        const url = `${API_URL}/${slug}`
        axios.post(url)
          .then(data => {
            console.log(data.data)
            if (data.data.StatusCode === "1") {
              alert('changed password successfully!')
              return dispatch({
                type: 'CHANGE_PASSWORD',
                payload: data.data
              })
            } else {
              alert('Could not change password')
              return dispatch({
                type: 'NOT_CHANGED_PASSWORD'
              })
            } 2
          })
          .catch(err => console.log(err))
      })
      .catch()
  }
}

export const getAuth = () => {
  AsyncStorage.getItem('token')
    .then(token => {
      if (token) {
        return {
          type: 'AUTH_TRUE'
        }
      } else {
        return {
          type: 'AUTH_FALSE'
        }
      }
    })
}