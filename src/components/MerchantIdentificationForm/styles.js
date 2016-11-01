'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container        : StyleSheet.flatten(base.container),
  paddedContainer: StyleSheet.flatten(base.paddedContainer),
  rows             : StyleSheet.flatten(base.rows),
  centered         : StyleSheet.flatten(base.centered),
  wrapped     : StyleSheet.flatten(base.wrapped),
  spaceAround      : StyleSheet.flatten(base.spaceAround),
  threeQuarterWidth: StyleSheet.flatten(base.threeQuarterWidth),
  halfWidth        : StyleSheet.flatten(base.halfWidth),
  h1               : StyleSheet.flatten(base.h1),
  h2               : StyleSheet.flatten(base.h2),
  h3               : StyleSheet.flatten(base.h3),
  buttonContainer  : StyleSheet.flatten(base.buttonContainer),
  buttonText       : StyleSheet.flatten(base.buttonText),
  textCentered     : StyleSheet.flatten(base.textCentered)

})