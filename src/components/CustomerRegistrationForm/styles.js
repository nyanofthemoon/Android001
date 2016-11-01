'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container        : StyleSheet.flatten(base.container),
  paddedContainer  : StyleSheet.flatten(base.paddedContainer),
  rows             : StyleSheet.flatten(base.rows),
  columns          : StyleSheet.flatten(base.columns),
  centered         : StyleSheet.flatten(base.centered),
  spaceAround      : StyleSheet.flatten(base.spaceAround),
  threeQuarterWidth: StyleSheet.flatten(base.threeQuarterWidth),
  halfWidth        : StyleSheet.flatten(base.halfWidth),
  h1               : StyleSheet.flatten(base.h1),
  h2               : StyleSheet.flatten(base.h2),
  h3               : StyleSheet.flatten(base.h3),
  h4               : StyleSheet.flatten(base.h4),
  p                : StyleSheet.flatten(base.p),
  shadowed         : StyleSheet.flatten(base.shadowed),
  buttonContainer  : StyleSheet.flatten(base.buttonContainer),
  buttonText       : StyleSheet.flatten(base.buttonText),
  textCentered     : StyleSheet.flatten(base.textCentered),
  textRighted: StyleSheet.flatten(base.textRighted),
  input            : StyleSheet.flatten(base.input),
  inputSmall       : StyleSheet.flatten(base.inputSmall),
  label : StyleSheet.flatten(base.label),

  gender: {
    width: 50,
    height: 50
  },

  calendar: {
    width: 32,
    height: 32,
    position:'relative',
    left:-37
  },

  cake: {
    width: 25,
    height: 25,
    marginLeft: 10,
    position: 'relative',
    top: -2
  },

  selectedGender: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    backgroundColor: '#FFFFFF',
    padding: 4
  },

  birthdayThought: {
    paddingTop: 10,
    alignSelf:'flex-end',
    marginRight: 13
  },

  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }

})