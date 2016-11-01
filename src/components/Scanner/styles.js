'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  fullHeight: StyleSheet.flatten(base.fullHeight),
  centered: StyleSheet.flatten(base.centered),

  container: {
    flex:1,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height
  },

  scanCount: {
    position: 'absolute',
    right: 7,
    top: 5,
    fontSize: 16,
    color: 'white'
  }

})