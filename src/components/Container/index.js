'use strict'

import React, { Component } from 'react'
import { AppState, NetInfo, View, StatusBar, TouchableWithoutFeedback } from 'react-native'
var Spinner = require('react-native-spinkit')

import { handleAppStateChange, handleAppMemoryWarning, handleAppConnectivityChange, goToHomeScene, goToEmployeeScene, hasNetworkConnection } from './../../actions'

import Config from './../../config'

import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      employeeButtonClicks   : 0,
      lastEmployeeButtonClick: 0
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', handleAppStateChange)
    AppState.removeEventListener('memoryWarning', handleAppMemoryWarning)
    NetInfo.isConnected.removeEventListener('change', handleAppConnectivityChange)
  }

  componentDidMount() {
    AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('memoryWarning', handleAppMemoryWarning)
    NetInfo.isConnected.addEventListener('change', handleAppConnectivityChange)
  }

  _handleInvisibleEmployeeButton() {
    let now = new Date().getTime()
    if ((now - this.state.lastEmployeeButtonClick) <= 1000) {
      let clicks = this.state.employeeButtonClicks + 1
      if (clicks >= 5) {
        goToEmployeeScene()
      } else {
        this.setState({
          employeeButtonClicks: clicks,
          lastEmployeeButtonClick: now
        })
      }
    } else {
      this.setState({
        employeeButtonClicks: 1,
        lastEmployeeButtonClick: now
      })
    }
  }

  render() {
    let overlay = null
    let key     = 'container'
    if (true === this.props.loading) {
      key     = new Date().getTime()
      overlay = (<View accessible={false} style={[styles.overlay, styles.centered]}>
        <Spinner size={300} type='FadingCircleAlt' color='#FFFFFF'/>
      </View>)
    }
    return (
      <View key={key} style={[styles.fullSize, styles.container]}>
        <StatusBar hidden={true}/>
        {this.props.children}
        {overlay}
        <TouchableWithoutFeedback onPress={goToHomeScene}><View style={styles.invisibleResetButton} /></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._handleInvisibleEmployeeButton.bind(this)}><View style={styles.invisibleEmployeeButton} /></TouchableWithoutFeedback>
      </View>
    )
  }

}