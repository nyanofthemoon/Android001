'use strict'

import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

export default class extends Component {

  static propTypes = {
    handleOnPress: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    text: React.PropTypes.string
  }

  render() {
    let type = (this.props.type) ? 'button_' + this.props.type.toString().toLowerCase() : 'button_default'
    let text = (this.props.type) ? 'buttonText_' + this.props.type.toString().toLowerCase() : 'buttonText_default'
    let line = (this.props.type) ? 'linearGradient_' + this.props.type.toString().toLowerCase() : 'linearGradient_default'
    let gradient = null
    if (!this.props.type || 'default' === this.props.type) {
      gradient = (<View style={styles.rows}>
        <LinearGradient start={[0,0.9]} end={[0.9,1] } locations={[0,0.75]} style={styles[line]} colors={['white', '#E0A443']}/>
        <LinearGradient start={[0,1]}   end={[1,1] }   locations={[0.25,1]} style={styles[line]} colors={['#E0A443', 'white']}/>
        <LinearGradient start={[0,0.9]} end={[0.9,1] } locations={[0,0.75]} style={styles[line]} colors={['white', '#E0A443']}/>
        <LinearGradient start={[0,1]}   end={[1,1] }   locations={[0.25,1]} style={styles[line]} colors={['#E0A443', 'white']}/>
      </View>)
    }

    if ('facebook' !== this.props.type) {
      return (
        <TouchableHighlight style={[styles.rounded, {zIndex:5000}]} onPress={this.props.handleOnPress} underlayColor='#FFFFFF'>
          <View style={[styles.button, styles.shadowed, styles.centered, styles[type]]}>
            <Text style={[styles.textShadowed, styles[text]]}>{(this.props.text || 'OK')}</Text>
            {gradient}
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight style={{width:325, alignSelf:'center'}} onPress={this.props.handleOnPress} underlayColor='#DDDDDD'>
          <View style={[styles.button, styles.centered]}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient_facebook}>
              <Text style={[styles[text], {color:'#EEEEEE', marginTop:3, paddingBottom:8}]}>{(this.props.text || 'OK')}</Text>
            </LinearGradient>
          </View>
        </TouchableHighlight>
      )
    }
  }

}