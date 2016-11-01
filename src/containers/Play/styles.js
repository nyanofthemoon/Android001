'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import base from './../../components/Container/styles'

let overlayWidth  = 1000
let overlayHeight = 800

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  centered: StyleSheet.flatten(base.centered),
  rows: StyleSheet.flatten(base.rows),
  shadowed: StyleSheet.flatten(base.shadowed),
  columns: StyleSheet.flatten(base.columns),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  backgroundImageCover: StyleSheet.flatten(base.backgroundImageCover),
  textCentered: StyleSheet.flatten(base.textCentered),
  h1: StyleSheet.flatten(base.h1),
  h2: StyleSheet.flatten(base.h2),
  h3: StyleSheet.flatten(base.h3),
  textShadowed: StyleSheet.flatten(base.textShadowed),

  oneThirdWidth: StyleSheet.flatten(base.oneThirdWidth),
  twoThirdWidth: StyleSheet.flatten(base.twoThirdWidth),

  overlay: {
    flex: 1,
    zIndex:100,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: overlayWidth,
    height: overlayHeight,
    left:  Math.floor(((Dimensions.get('window').width - overlayWidth)/2)),
    top :  Math.floor(((Dimensions.get('window').height - overlayHeight)/2))
  },

  sponsor: {
    height    : 250,
    resizeMode: 'center',
    marginBottom: 50
  },

  prizeContainer: {
    backgroundColor: 'white',
    height: 75,
    borderRadius: 50,
    marginTop: 75
  }

})
