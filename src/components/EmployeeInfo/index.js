'use strict'

import React, { Component } from 'react'
import { View, TextInput, Image, TouchableWithoutFeedback } from 'react-native'

import Images from './../../helpers/images'

import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      secure: true
    }
  }

  _togglePinVisibility() {
    this.setState({
      secure: ((false === this.state.secure) ? true : false)
    })
  }

  render() {
    return (
      <View accessible={false} style={[styles.rows]}>
        <TextInput underlineColorAndroid='transparent' editable={false} style={[styles.input, styles.inputSmall, styles.firstName]} value={this.props.data.first_name} />
        <TextInput underlineColorAndroid='transparent' editable={false} style={[styles.input, styles.inputSmall, styles.lastName]} value={this.props.data.last_name} />
        <View style={styles.rows}>
          <TextInput underlineColorAndroid='transparent' ref='pin' secureTextEntry={this.state.secure} editable={false} style={[styles.input, styles.inputSmall, styles.pin]} value={this.props.data.pin} />
          <TouchableWithoutFeedback onPress={this._togglePinVisibility.bind(this)}>
            <Image source={Images.eye} style={styles.eye}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
