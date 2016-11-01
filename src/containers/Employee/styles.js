'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  paddedContainer: StyleSheet.flatten(base.paddedContainer),
  backgroundImageCover: StyleSheet.flatten(base.container),
  textShadowed: StyleSheet.flatten(base.textShadowed),
  halfWidth: StyleSheet.flatten(base.halfWidth),
  centered: StyleSheet.flatten(base.centered),
  h2: StyleSheet.flatten(base.h2),
  rows: StyleSheet.flatten(base.rows),

})