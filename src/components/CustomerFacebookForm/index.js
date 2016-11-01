'use strict'

import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Alert, NativeModules } from 'react-native'

const FBSDK = require('react-native-fbsdk')
const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK
const FacebookLoginManager = NativeModules.FBLoginManager
import * as Animatable from 'react-native-animatable'

import { hideKeyboard } from './../../actions'


import Button from './../../components/Button'

import Images from './../../helpers/images'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  _handleAuthenticationFailure(error) {
    Alert.alert(
      this.props.contents.REGISTRATION_ERROR_FB_API,
      error.toString()
    )
  }

  _handleAuthenticationSuccess() {
    let that = this
    AccessToken.getCurrentAccessToken().then(function(data) {
      new GraphRequestManager().addRequest(new GraphRequest(
        '/me?fields=id,email,gender,birthday,first_name,last_name,age_range',
        null,
        function(error, result) {
          if (error) {
            Alert.alert(
              this.props.contents.REGISTRATION_ERROR_FB_API,
              error.toString()
            )
          } else {
            let data  = {
              firstName       : result.first_name                || null,
              lastName        : result.last_name                 || null,
              email           : result.email                     || null,
              gender          : result.gender                    || null,
              facebookId      : result.id                        || null,
              facebookAgeRange: JSON.stringify(result.age_range) || null
            }
            that.props.handleSubmission(data)
          }
        }
      )).start()
    }).catch((error) => {
      that._handleAuthenticationFailure(error)
    })
  }

  launchLoginModel() {
    let that = this
    FacebookLoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday']).then((result) => {
      if (false === result.isCancelled) {
        that._handleAuthenticationSuccess()
      }
    }).catch((error) => {
      that._handleAuthenticationFailure(error)
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={[styles.container, styles.columns, styles.spaceAround]}>
          <Animatable.View style={[styles.rows, styles.centered]} animation='flipInX' duration={1000} iterationCount={1}>
            <Image style={styles.facebook} source={Images.facebook}/>
            <Text style={[styles.oneThirdWidth, styles.wrapped, styles.h3, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_FACEBOOK_INCITATIVE}</Text>
          </Animatable.View>
          <Animatable.View animation='pulse' duration={1000} iterationCount='infinite'>
            <Button type='facebook' text={this.props.contents.REGISTRATION_BUTTON_FACEBOOK} handleOnPress={this.launchLoginModel.bind(this)}/>
          </Animatable.View>
          <View style={[styles.rows, styles.centered]}>
            <Image style={styles.lock} source={Images.lock}/>
            <Text style={[styles.wrapped, styles.p, this.props.campaign.frontStyle]}>{this.props.contents.REGISTRATION_FACEBOOK_PRIVACY}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}