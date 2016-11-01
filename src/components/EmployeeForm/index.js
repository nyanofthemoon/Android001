'use strict'

import React, { Component } from 'react'
import { View, Text, TextInput, Alert } from 'react-native'

import Button from './../Button'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name : ''
    }
  }

  _handleTextInputValueChange(name, value) {
    let state   = {}
    state[name] = value
    this.setState(state)
  }

  _handleOnPress() {
    this.props.handleSubmission(this.state)
  }

  _focusField(field) {
    this.refs[field].focus()
  }

  render() {
    return (
      <View style={[styles.columns, {alignSelf:'flex-end', marginRight:50}]}>
        <View style={styles.rows}>
          <TextInput ref='first_name' autoCapitalize='sentences' placeholder={this.props.contents.REGISTRATION_FIRST_NAME} style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle, styles.firstName]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('first_name', event.nativeEvent.text)} autoCorrect={false} blurOnSubmit={false} onSubmitEditing={this._focusField.bind(this, 'ast_name')} returnKeyType='next'/>
          <TextInput ref='last_name' autoCapitalize='sentences' placeholder={this.props.contents.REGISTRATION_LAST_NAME} style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle, styles.lastName]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('last_name', event.nativeEvent.text)} autoCorrect={false} returnKeyType='done'/>
        </View>
        <View style={{ width: 275, alignSelf:'flex-end', marginRight:-10 }}>
            <Button type='small' text={this.props.contents.EMPLOYEE_BUTTON} handleOnPress={this._handleOnPress.bind(this)}/>
        </View>
      </View>
    )
  }

}