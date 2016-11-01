'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container  : StyleSheet.flatten(base.container),
  centered   : StyleSheet.flatten(base.centered),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  p          : StyleSheet.flatten(base.p),
  backgroundImageCover: StyleSheet.flatten(base.backgroundImageCover),

  backgroundColor: {
    backgroundColor: '#000000'
  },

  text: {
    color: '#FFFFFF'
  }

})