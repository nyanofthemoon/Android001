'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),

  modalContainer: {
    justifyContent: 'center',
    zIndex        : 9996,
    margin        : 0,
    padding       : 0
  },

  modal: {
    backgroundColor: '#EEEEEE',
    zIndex         : 9997,
    margin         : 0,
    padding        : 1,
    flex           : 1
  },

  loading: {
    position: 'absolute',
    zIndex  : 9997,
    top: 325,
    left: 175
  },

  button: {
    position: 'absolute',
    zIndex  : 9998,
    top     : 10,
    left    : 10,
    color   : '#EB0000',
    backgroundColor: '#8B0000',
    height  : 43,
    width   : 43,
    borderRadius: 25,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 30
  }

})