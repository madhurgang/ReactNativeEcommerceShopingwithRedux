import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import { getProducts } from '../redux/actions/actions'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from "react-native";
import NavigationService from '../routes/NavigationService';
import { Entypo } from '@expo/vector-icons';

const ProductCard = ({ imageUri, title, productOfferprice, currency, productMrp, brand }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', padding: 5, borderWidth: 1, borderColor: 'lightgrey', margin: 9, borderRadius: 16 }}>
      <View style={{ flex: 3, padding: 10 }}>
        <Image style={{ height: 80, width: undefined, borderRadius: 10 }}
          source={{
            uri: imageUri
          }} />
      </View>
      <View style={{ flex: 5 }}>
        <Text style={{ color: 'grey', marginBottom: 5 }}>{title}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <Text style={{ color: '#fd9416', marginEnd: 10 }}>{currency}{productOfferprice}</Text>
          <Text style={{ color: 'grey', textDecorationLine: "line-through" }}>{currency}{productMrp}</Text>
        </View>
        <Text style={{ color: 'grey' }}>Fullilled by <Text style={{ color: 'black' }}>{brand}</Text></Text>
        <View style={{ flexDirection: 'row' }}>
          <Entypo name="shopping-cart" size={24} color="#fd9416" style={{ marginEnd: 10 }} />
          <Entypo name="heart" size={24} color="red" />
        </View>
      </View>
    </View>
  )
}

class Product extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  handleLogout = () => {
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, marginTop: 35 }}>
        {this.props.allProducts.map((item, i) =>
          <ProductCard key={i}
            imageUri={item.productImage}
            title={item.productAlt}
            currency={item.productcurrency}
            productMrp={item.productMrp}
            productOfferprice={item.productOfferprice}
            brand={item.brand}
          />)}
      </ScrollView>
    )
  }

  componentDidMount = () => {
    this.props.getProducts()
  }
}

const mapActions = {
  getProducts: getProducts
}

const mapState = state => ({
  allProducts: state.mainReducer.allProducts
})

export default connect(mapState, mapActions)(Product)
