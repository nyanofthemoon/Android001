'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  rows: StyleSheet.flatten(base.rows),
  textRighted: StyleSheet.flatten(base.textRighted),
  input: StyleSheet.flatten(base.input),
  inputLarge: StyleSheet.flatten(base.inputLarge),

  code: {
    width: 500,
    marginRight: 25
  },

  quantity: {
    width: 75
  },

  purchaseContainer: {
    marginBottom: 10
  },

  removeButton: {

  }

})