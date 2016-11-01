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
  textCentered: StyleSheet.flatten(base.textCentered),

  wheel: {
    height    : 575,
    resizeMode: 'center',
    marginLeft: 25
  },

  sepLeft: {
    position: 'absolute',
    left     : Math.floor((Dimensions.get('window').width / 2)) - 25,
    top    : Math.floor((Dimensions.get('window').height / 2)),
    zIndex: 1001,
    color: 'white',
    padding: 4,
    paddingLeft: 5,
    backgroundColor: 'black',
    fontSize: 25
  },
  sepRight: {
    position: 'absolute',
    left    : -2,
    top  : Math.floor((Dimensions.get('window').height / 2)),
    zIndex: 1001,
    color: 'white',
    padding: 4,
    paddingRight: 5,
    backgroundColor: 'black',
    fontSize: 25
  },

  overlayStyle: {
    zIndex: 9998
  }

})