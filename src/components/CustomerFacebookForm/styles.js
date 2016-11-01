'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container        : StyleSheet.flatten(base.container),
  columns          : StyleSheet.flatten(base.columns),
  rows             : StyleSheet.flatten(base.rows),
  centered         : StyleSheet.flatten(base.centered),
  textCentered     : StyleSheet.flatten(base.textCentered),
  spaceAround      : StyleSheet.flatten(base.spaceAround),
  h3               : StyleSheet.flatten(base.h3),
  p                : StyleSheet.flatten(base.p),
  wrapped : StyleSheet.flatten(base.wrapped),
  oneThirdWidth : StyleSheet.flatten(base.oneThirdWidth),

  paddedContainer: StyleSheet.flatten(base.paddedContainer),

  lock: {
    height: 50,
    width: 150,
    resizeMode: 'center',
    marginRight: 15
  },

  facebook: {
    width: 50,
    height: 50,
    marginRight: 20
  }

})