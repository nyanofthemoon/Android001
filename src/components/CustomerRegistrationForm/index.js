'use strict'

import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight, Alert, TextInput, Switch, WebView, TouchableWithoutFeedback, DatePickerAndroid } from 'react-native'
import CheckBox from 'react-native-checkbox'

import { hideKeyboard, switchLanguage } from './../../actions'

import Button from './../Button'
import Modal from './../Modal'

import Images from './../../helpers/images'

import Config from './../../config'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      agree           : false,
      birthday        : new Date(),
      birthdayText    : '',
      firstName       : '',
      lastName        : '',
      email           : '',
      phone           : '',
      gender          : ''
    }
  }

  _handleSwitchAgreementValueChange(value) {
    this.props.removeOpacity()
    this.setState({ agree: value })
  }

  _handleTextInputValueChange(name, value) {
    this.props.removeOpacity()
    let state = {}
    state[name] = value
    this.setState(state)
    if ('gender' === name) {
      hideKeyboard()
    }
  }

  _handleFormSubmission() {
    this.props.removeOpacity()
    if (true === this.state.agree) {
      if (-1 !== this.state.email.indexOf('@')) {
        let data = {
          firstName: this.state.firstName,
          lastName : this.state.lastName,
          email    : this.state.email,
          phone    : this.state.phone,
          gender   : this.state.gender,
          birthday : this.state.birthday
        }
        this.props.handleSubmission(data)
      } else {
        Alert.alert(
          this.props.contents.GENERIC_ERROR_FORM,
          this.props.contents.REGISTRATION_ERROR_FORM
        )
      }
    } else {
      Alert.alert(
        this.props.contents.GENERIC_ERROR_FORM,
        this.props.contents.REGISTRATION_ERROR_FORM_MUST_AGREE
      )
    }
  }

  showBirthdayPicker = async (options) => {
    hideKeyboard()
    this.props.removeOpacity()
    try {
      var newState = {}
      const {action, year, month, day} = await DatePickerAndroid.open(options)
      if (action === DatePickerAndroid.dismissedAction) {
        newState.birthdayText = ''
      } else {
        var date = new Date(year, month, day)
        newState.birthdayText = date.toLocaleDateString()
        newState.birthday     = date
      }
      this.setState(newState)
    } catch(e) {}
  }

  _focusField(field) {
    this.refs[field].focus()
  }

  render() {
    let selectedWoman = {}
    let selectedMan   = {}
    if ('male' === this.state.gender) {
      selectedMan   = styles.selectedGender
    } else if ('female' === this.state.gender) {
      selectedWoman = styles.selectedGender
    }
    return (
      <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={[styles.paddedContainer, styles.columns, styles.spaceAround]}>
        <Modal ref='modal' style={styles.container}>
          <WebView automaticallyAdjustContentInsets={false} contentInset={{top:50,left:50,bottom:50,right:50}} scalesPageToFit={false} source={{uri: Config.privacyPolicy[this.props.language]}} />
        </Modal>
        <View style={[styles.rows, styles.centered]}>
          <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_FIRST_NAME}</Text>
          <TextInput ref='firstName' autoCapitalize='sentences' style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('firstName', event.nativeEvent.text)} autoCorrect={false} blurOnSubmit={false} returnKeyType='next' onSubmitEditing={this._focusField.bind(this, 'email')} onFocus={this.props.removeOpacity} />
        </View>
        <View style={[styles.rows, styles.centered, this.props.campaign.frontStyle]}>
          <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_LAST_NAME}</Text>
          <TextInput ref='lastName' autoCapitalize='sentences' style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('lastName', event.nativeEvent.text)} autoCorrect={false} blurOnSubmit={false} returnKeyType='next' onSubmitEditing={this._focusField.bind(this, 'firstName')} onFocus={this.props.removeOpacity}/>
        </View>
        <View style={[styles.rows, styles.centered]}>
          <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_EMAIL} *</Text>
          <TextInput ref='email' keyboardType='email-address' style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('email', event.nativeEvent.text)} autoCorrect={false} blurOnSubmit={false} returnKeyType='next' onSubmitEditing={this._focusField.bind(this, 'phone')} onFocus={this.props.removeOpacity}/>
        </View>
        <View style={[styles.rows, styles.centered]}>
          <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_PHONE}</Text>
          <TextInput ref='phone' keyboardType='phone-pad' style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle]} underlineColorAndroid='transparent' onChange={(event) => this._handleTextInputValueChange('phone', event.nativeEvent.text)} autoCorrect={false} returnKeyType='done' onFocus={this.props.removeOpacity}/>
        </View>
        <View style={[styles.rows, styles.centered]}>
          <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_GENDER}</Text>
          <View style={[styles.rows, styles.centered, styles.inputSmall, styles.spaceAround]}>
            <TouchableHighlight style={[{padding:5}, selectedMan]} onPress={(event) => this._handleTextInputValueChange('gender', 'male')} underlayColor='#EEEEEE'>
              <Image style={styles.gender} source={Images.man}/>
            </TouchableHighlight>
            <TouchableHighlight style={[{padding:5}, selectedWoman]} onPress={(event) => this._handleTextInputValueChange('gender', 'female')} underlayColor='#EEEEEE'>
              <Image style={styles.gender} source={Images.woman}/>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.showBirthdayPicker.bind(this, {date: this.state.birthday})}>
          <View style={styles.columns}>
            <View style={[styles.rows, styles.centered, {marginLeft:25}]}>
              <Text style={[styles.label, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_BIRTHDAY}</Text>
              <TextInput onFocus={this.showBirthdayPicker.bind(this, {date: this.state.birthday})} style={[styles.input, styles.inputSmall, this.props.campaign.frontStyle]} underlineColorAndroid='transparent' defaultValue={this.state.birthdayText}/>
              <Image style={[styles.calendar]} source={Images.calendar}/>
            </View>
            <View style={[styles.rows, styles.birthdayThought]}>
              <Text style={[styles.p, this.props.campaign.frontStyle]}>{this.props.campaign.sponsor} {this.props.contents.REGISTRATION_BIRTHDAY_NOTE}</Text>
              <Image style={[styles.cake]} source={Images.cake}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={[styles.halfWidth, styles.rows, styles.centered]}>
          <CheckBox label='' checkboxStyle={{width:30,height:30,backgroundColor:'#FFFFFF'}} containerStyle={{marginTop:10,marginRight:10,paddingLeft:10}} checked={this.state.agree} onChange={(checked) => this._handleSwitchAgreementValueChange(checked)} />
          <Text style={[styles.h4, this.props.campaign.frontStyle, {textDecorationLine :'underline', fontWeight:'bold', marginLeft:10}]} onPress={() => {this.props.removeOpacity(); this.refs.modal.open(); }}> {this.props.contents.REGISTRATION_ACCEPT} *</Text>
        </View>
        <View style={[styles.rows, styles.centered, styles.spaceAround]}>
          <Button type='round' text={this.props.contents.GENERIC_LANGUAGE_BUTTON} handleOnPress={() => {this.props.removeOpacity(); switchLanguage()}}/>
          <Button type='default' text={this.props.contents.REGISTRATION_BUTTON} handleOnPress={this._handleFormSubmission.bind(this)}/>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }

}