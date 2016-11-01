'use strict'

import { StyleSheet } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: StyleSheet.flatten(base.container),
  centered: StyleSheet.flatten(base.centered),
  fullHeight: StyleSheet.flatten(base.fullHeight),
  halfWidth: StyleSheet.flatten(base.halfWidth),
  rows: StyleSheet.flatten(base.rows),
  columns: StyleSheet.flatten(base.columns),
  spaceAround: StyleSheet.flatten(base.spaceAround),
  spaceBetween: StyleSheet.flatten(base.spaceBetween),
  textShadowed: StyleSheet.flatten(base.textShadowed),
  h1: StyleSheet.flatten(base.h1),
  h2: StyleSheet.flatten(base.h2),
  h3: StyleSheet.flatten(base.h3),
  h4: StyleSheet.flatten(base.h4),
  p: StyleSheet.flatten(base.p),
  textCentered: StyleSheet.flatten(base.textCentered),
  wrapped:  StyleSheet.flatten(base.wrapped),

  lock: {
    height: 50,
    width: 150,
    resizeMode: 'center',
    marginRight: 15
  }

})