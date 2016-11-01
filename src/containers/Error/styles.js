'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container  : StyleSheet.flatten(base.container),
  centered   : StyleSheet.flatten(base.centered),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  h1         : StyleSheet.flatten(base.h1),
  h2         : StyleSheet.flatten(base.h2),
  h3         : StyleSheet.flatten(base.h3)

})