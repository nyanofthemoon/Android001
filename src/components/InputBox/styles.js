'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  shadowed: StyleSheet.flatten(base.shadowed),

  inputBox: {
    width: 150,
    height: 150,
    fontSize: 75,
    textAlign: 'center',
    backgroundColor: 'white',
    zIndex: 100
  },


})