'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container        : StyleSheet.flatten(base.container),
  rows             : StyleSheet.flatten(base.rows),
  centered         : StyleSheet.flatten(base.centered),
  spaceAround      : StyleSheet.flatten(base.spaceAround),
  threeQuarterWidth: StyleSheet.flatten(base.threeQuarterWidth),
  halfWidth        : StyleSheet.flatten(base.halfWidth),
  wrapped        : StyleSheet.flatten(base.wrapped),
  h1               : StyleSheet.flatten(base.h1),
  h2               : StyleSheet.flatten(base.h2),
  h3               : StyleSheet.flatten(base.h3),
  shadowed         : StyleSheet.flatten(base.shadowed),
  buttonContainer  : StyleSheet.flatten(base.buttonContainer),
  buttonText       : StyleSheet.flatten(base.buttonText),
  textCentered     : StyleSheet.flatten(base.textCentered),
  input : StyleSheet.flatten(base.input),
  inputSmall : StyleSheet.flatten(base.inputSmall),

  firstName: { width: 150 },
  lastName : { width: 290 },

})