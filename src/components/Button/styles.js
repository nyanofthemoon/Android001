'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  buttonText_default: StyleSheet.flatten(base.buttonText),
  button_default : StyleSheet.flatten(base.buttonDefault),
  button_round   : StyleSheet.flatten(base.buttonRound),
  centered       : StyleSheet.flatten(base.centered),
  rows           : StyleSheet.flatten(base.rows),
  shadowed       : StyleSheet.flatten(base.shadowed),
  h1             : StyleSheet.flatten(base.h1),
  h2             : StyleSheet.flatten(base.h2),
  textShadowed   : StyleSheet.flatten(base.textShadowed),

  button_small   : StyleSheet.flatten(base.buttonSmall),
  buttonText_small: StyleSheet.flatten(base.buttonTextSmall),
  buttonText_large: StyleSheet.flatten(base.buttonTextLarge),

  rounded: { borderRadius: 50 },
  buttonText_round: StyleSheet.flatten(base.buttonText),
  buttonText_facebook: StyleSheet.flatten(base.buttonText),

  linearGradient_default: {
    width : 25,
    height: 3
  },

  linearGradient_round: {
    width : 10,
    height: 3
  },

  linearGradient_facebook: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }


})