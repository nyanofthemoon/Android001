'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'

import Modal from 'react-native-simple-modal'
var Spinner = require('react-native-spinkit')

import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loader: true,
      open  : false
    }
  }

  open() {
    this.setState({ open: true })
    setTimeout(()=>{
      this.setState({ loader: false })
    },7000)
  }

  close() {
    this.setState({
      open  : false,
      loader: true
    })
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 0.5)'}
        animationDuration={200}
        animationTension={40}
        modalDidOpen={() => this.setState({open: true})}
        modalDidClose={() => this.setState({open: false})}
        closeOnTouchOutside={true}
        containerStyle={[styles.container, styles.modalContainer]}
        modalStyle={[styles.container, styles.modal]}>
        <Text style={styles.button} onPress={this.close.bind(this)}>X</Text>
        <Spinner style={styles.loading} size={100} type='FadingCircleAlt' color='#CCCCCC' isVisible={this.state.loader}/>
        {this.props.children}
      </Modal>
    )
  }

}