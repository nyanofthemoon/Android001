'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container  : StyleSheet.flatten(base.container),
  centered   : StyleSheet.flatten(base.centered),
  rows       : StyleSheet.flatten(base.rows),
  columns    : StyleSheet.flatten(base.columns),
  halfWidth  : StyleSheet.flatten(base.halfWidth),
  backgroundImageCover: StyleSheet.flatten(base.backgroundImageCover),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  h1       : StyleSheet.flatten(base.h1),
  h2       : StyleSheet.flatten(base.h2),
  h3       : StyleSheet.flatten(base.h3),
  h4       : StyleSheet.flatten(base.h4),
  textCentered: StyleSheet.flatten(base.textCentered),
  textShadowed: StyleSheet.flatten(base.textShadowed),

  prizeContainer: {
    marginTop: 25
  },

  sponsor: {
    height    : 250,
    resizeMode: 'center'
  },

  wheel: {
    height    : 575,
    resizeMode: 'center',
    marginLeft: 50,
    zIndex    : 100
  }

})