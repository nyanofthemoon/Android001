'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  paddedContainer: StyleSheet.flatten(base.paddedContainer),
  centered: StyleSheet.flatten(base.centered),
  rows: StyleSheet.flatten(base.rows),
  columns: StyleSheet.flatten(base.columns),
  spaceBetween: StyleSheet.flatten(base.spaceBetween),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  textRighted: StyleSheet.flatten(base.textRighted),
  input: StyleSheet.flatten(base.input),
  inputSmall: StyleSheet.flatten(base.inputSmall),
  inputLarge: StyleSheet.flatten(base.inputLarge),
  fullHeight: StyleSheet.flatten(base.fullHeight),
  removeButton: {
    position: 'absolute',
    right: 115,
    bottom: 30,
    paddingLeft: 5,
    paddingRight: 5
  },
  removeText: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})