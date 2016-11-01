'use strict'

import React, { Component } from 'react'
import { View, TextInput } from 'react-native'

import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code    : null,
      quantity: null
    }
  }

  getCode() {
    return this.state.code || this.props.code
  }

  getQuantity() {
    return this.state.quantity || this.props.quantity
  }

  setCode(code) {
    this.setState({ code: code })
  }

  setQuantity(quantity) {
    this.setState({ quantity: quantity })
  }

  _focusField = (field) => {
    this.refs[field].focus()
  }

  render() {
    return (
      <View style={[styles.purchaseContainer, styles.rows, styles.spaceBetween]}>
        <TextInput ref='code' underlineColorAndroid='transparent' autoCorrect={false} style={[styles.input, styles.inputLarge, styles.code]} placeholder={(this.props.placeholder || '')} value={(this.state.code || this.props.code || '')} keyboardType='numeric' onChangeText={(value) => this.setCode(value)} blurOnSubmit={false} returnKeyType='next' onSubmitEditing={()=>this._focusField('quantity')} />
        <TextInput ref='quantity' underlineColorAndroid='transparent' autoCorrect={false} style={[styles.input, styles.inputLarge, styles.quantity, styles.textRighted]} defaultValue={(this.state.quantity || this.props.quantity || '1')} keyboardType='numeric' onChangeText={(value) => this.setQuantity(value)} returnKeyType='done' />
      </View>
    )
  }
}