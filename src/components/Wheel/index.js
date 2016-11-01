'use strict'

import React, { Component } from 'react'
import { Text, View, Animated, Image, PanResponder } from 'react-native'

import styles from './styles'
import makeSpinnable from '../Spinner'

class Wheel extends Component {

  constructor(props) {
    super(props);
    this._getAngleIncrement = this._getAngleIncrement.bind(this);
    let angle     = this._getAngleIncrement() / 360 * 2 * Math.PI;
    let halfAngle = angle / 2
    let oppSize   = Math.sin(halfAngle) / Math.cos(halfAngle) * this.props.radius
    let hyp       = Math.sqrt(this.props.radius*this.props.radius + oppSize*oppSize)
    this.stylez = {
      container: {
        width: hyp * 2,
        height: hyp * 2
      },
      wheel: {
        top: -hyp,
        left: -hyp,
        width: hyp * 2,
        height: hyp * 2,
        borderRadius: hyp,
        borderWidth: hyp - this.props.radius
      },
      triangle: {
        top: -this.props.radius,
        left: -oppSize,
        borderTopWidth: this.props.radius,
        borderRightWidth: oppSize,
        borderBottomWidth: this.props.radius,
        borderLeftWidth: oppSize
      },
      txtContainer: {
        left: -this.props.radius,
        top: -oppSize,
        height: oppSize * 2,
        width: this.props.radius * 2
      }
    }
  }

  _getAngleIncrement() {
    return 360 / this.props.parts
  }

  render() {
    const angleIncr = this._getAngleIncrement()
    return (
      <View style={[styles.container, this.stylez.container]}>
        <View>
          {
            Array(this.props.parts).fill(null).map((x, i) => (
              <View key={i} style={[styles.triangle, this.stylez.triangle, {borderTopColor: i === 0 ? this.props.mainBack : i % 2 === 0 ? this.props.primary:this.props.secondary, transform: [{rotateZ: angleIncr * i + 'deg'}]}]}/>
            ))
          }
        </View>
        <View>
          {
            Array(this.props.parts).fill(null).map((x, i) => (
              <View key={i} style={[styles.txtContainer, this.stylez.txtContainer, {transform: [{rotateZ: (angleIncr * i + 90) + 'deg'}]}]}>
                <Text style={[styles.txt, {color: i === 0 ? this.props.mainText : i % 2 === 0 ? this.props.secondary:this.props.primary}]}>{this.props.angleProbs[i].name_short}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.wheelContainer}>
          <View style={[styles.wheel, this.stylez.wheel]}>
            <View style={[styles.shadowed, styles.logoBack]}>
              <View style={[styles.shadowed, styles.logoContent]}>
                <Image style={styles.logo} source={{uri:this.props.logoImage}} />
              </View>
            </View>
          </View>
        </View>
      </View>)
  }
}

export default makeSpinnable(Wheel)