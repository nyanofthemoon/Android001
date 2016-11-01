'use strict'

import React, { Component } from 'react'
import { TextInput } from 'react-native'

import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  _handleChangeText(value) {
    this.setState({value: value.toUpperCase()})
    if ('' !== value && this.props.focusNext) {
      this.props.focusNext(this.props.nextRef)
    }
  }

  render() {
    let type = 'next'
    let blur = false
    if (!this.props.nextRef) {
      type = 'done'
      blur = true
    }
    let func = null
    if (this.props.submitFunc) {
      func = this.props.submitFunc
    }
    return (
      <TextInput ref='box'
        maxLength={1}
        underlineColorAndroid='transparent'
        style={[styles.shadowed, styles.inputBox]}
        value={this.state.value || ''}
        placeholder={this.props.placeholder}
        onChangeText={this._handleChangeText.bind(this)}
        returnKeyType={type}
        keyboardType={(this.props.keyboard || 'default')}
        blurOnSubmit={blur}
        autoCorrect={false}
        onSubmitEditing={func}
      />
    )
  }
}