'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  paddedContainer: StyleSheet.flatten(base.paddedContainer),
  rows: StyleSheet.flatten(base.rows),
  input: StyleSheet.flatten(base.input),
  inputSmall: StyleSheet.flatten(base.inputSmall),
  firstName: { width:190 },
  lastName: { width:190 },
  pin: { width:115 },

  eye: {
    width: 32,
    height: 32,
    position:'relative',
    top: 5,
    left:-50
  },

})