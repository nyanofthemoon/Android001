'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'

import Button from './../Button'
import InputBox from './../InputBox'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  _handleOnPress() {
    let pin = this.refs.one.state.value + this.refs.two.state.value + this.refs.three.state.value
    if (pin && pin.toString().indexOf('null') === -1) {
      this.props.handleSubmission(pin)
    } else {
      Alert.alert(
        this.props.contents.GENERIC_ERROR_FORM,
        this.props.contents.IDENTIFICATION_ERROR_PIN
      )
    }
  }

  _focusNext(ref) {
    this.refs[ref].refs.box.focus()
  }

  render() {
    return (
      <View style={[styles.paddedContainer, styles.columns, styles.centered, styles.spaceAround, {margin:100}]}>
        <Text style={[styles.h1, styles.textCentered, this.props.campaign.frontStyle]}>{this.props.contents.IDENTIFICATION_TITLE}</Text>
        <View>
          <Text style={[styles.h2, styles.textCentered, this.props.campaign.frontStyle]}>{this.props.contents.IDENTIFICATION_ENTER_PIN}</Text>
          <View style={[styles.rows]}>
            <InputBox keyboard='numeric' placeholder='1' ref='one' nextRef='two'   focusNext={this._focusNext.bind(this)}/>
            <InputBox keyboard='numeric' placeholder='2' ref='two' nextRef='three' focusNext={this._focusNext.bind(this)}/>
            <InputBox keyboard='numeric' placeholder='3' ref='three' submitFunc={this._handleOnPress.bind(this)}/>
          </View>
        </View>
        <Button text={this.props.contents.IDENTIFICATION_BUTTON} handleOnPress={this._handleOnPress.bind(this)}/>
      </View>
    )
  }

}