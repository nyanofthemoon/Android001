'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'

import { switchLanguage } from './../../actions'

import Button from './../Button'
import InputBox from './../InputBox'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  _handleOnPress() {
    let pin = this.refs.one.state.value + this.refs.two.state.value + this.refs.three.state.value + this.refs.four.state.value
    if (pin && pin.toString().indexOf('null') === -1) {
      this.props.handleSubmission(pin)
    } else {
      Alert.alert(
        this.props.contents.GENERIC_ERROR_FORM,
        this.props.contents.INSTALL_ERROR_PIN
      )
    }
  }

  _focusNext(ref) {
    this.refs[ref].refs.box.focus()
  }

  render() {
    return (
      <View style={[styles.paddedContainer, styles.columns, styles.centered, styles.spaceAround]}>
        <Text style={[styles.h1, styles.textCentered]}>{this.props.contents.INSTALLATION_TITLE}</Text>
        <Text style={[styles.h2, styles.textCentered]}>{this.props.contents.INSTALLATION_ENTER_PIN}</Text>
        <View style={[styles.rows, styles.centered]}>
          <InputBox placeholder='A' ref='one'   nextRef='two'   focusNext={this._focusNext.bind(this)}/>
          <InputBox placeholder='P' ref='two'   nextRef='three' focusNext={this._focusNext.bind(this)}/>
          <InputBox placeholder='P' ref='three' nextRef='four'  focusNext={this._focusNext.bind(this)}/>
          <InputBox placeholder='S' ref='four' submitFunc={this._handleOnPress.bind(this)}/>
        </View>
        <Text style={[styles.h3, styles.textCentered]}>{this.props.contents.INSTALLATION_INSTRUCTION}</Text>
        <Text style={[styles.h3, styles.textCentered]}>{this.props.contents.INSTALLATION_SUPPORT}</Text>
        <View style={[styles.halfWidth, styles.rows, styles.centered, styles.spaceAround]}>
          <Button type='round' text={this.props.contents.GENERIC_LANGUAGE_BUTTON} handleOnPress={switchLanguage}/>
          <Animatable.View animation='pulse' duration={1000} iterationCount='infinite'>
            <Button text={this.props.contents.INSTALLATION_BUTTON} handleOnPress={this._handleOnPress.bind(this)}/>
          </Animatable.View>
        </View>
      </View>
    )
  }

}