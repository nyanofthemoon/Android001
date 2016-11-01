'use strict'

import React, { Component } from 'react'
import { View, Text } from 'react-native'

import BarcodeScanner from 'react-native-barcodescanner'

import Button from './../Button'

import Sounds from './../../helpers/sounds'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleSubmission: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      scanning: false,
      count   : 0,
      items   : {
      }
    }
  }

  _barcodeReceived(e) {
    if (false === this.state.scanning) {
      // @NOTE UPC-A North America
      if (e.data && e.data.length >= 12) {
        this.setState({scanning: true})
        Sounds.scan.play((success) => {
          this.setState({
            scanning: false
          })
        })
        let count = this.state.count
        let items = this.state.items
        if (!items[e.data]) {
          items[e.data] = 0
        }
        items[e.data] = items[e.data] + 1
        count         = count + 1
        this.setState({
          items   : items,
          count   : count
        })
      }
    }
  }

  _finalizeScan() {
    this.props.handleSubmission(this.state.items)
  }

  render() {
    return (
      <View style={[styles.container, styles.centered, {backgroundColor:'#000000'}]}>
        <Text style={styles.scanCount}>{this.state.count}</Text>
        <BarcodeScanner
          onBarCodeRead={this._barcodeReceived.bind(this)}
          style={{marginBottom:25,height:300, width:400}}
          viewFinderBorderColor='green'
          viewFinderHeight={300}
          viewFinderWidth={400}
          viewFinderBorderWidth={5}
          torchMode='on'
          cameraType='back'
        />
        <Button text={this.props.contents.PURCHASE_SCAN_STOP} handleOnPress={this._finalizeScan.bind(this)}/>
      </View>
    )
  }
}