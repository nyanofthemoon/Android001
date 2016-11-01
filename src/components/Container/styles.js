'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  fullSize: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  overlay: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000000',
    opacity: 0.5,
    zIndex: 9999
  },

  invisibleResetButton: {
    flex: 1,
    height: 100,
    width: 100,
    position: 'absolute',
    top: 0,
    left: 0
  },

  invisibleEmployeeButton: {
    flex: 1,
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: 0,
    left: 0
  },

  fullHeight: {
    height: Dimensions.get('window').height
  },

  threeQuarterHeight: {
    height: Math.floor(Dimensions.get('window').height * 0.75)
  },

  fullWidth: {
    width: Dimensions.get('window').width
  },

  halfWidth: {
    width   : Math.floor(Dimensions.get('window').width * 0.5),
    maxWidth: Math.floor(Dimensions.get('window').width * 0.5)
  },

  threeQuarterWidth: {
    width: Math.floor(Dimensions.get('window').width * 0.75),
    maxWidth: Math.floor(Dimensions.get('window').width * 0.55)
  },

  oneThirdWidth: {
    width: Math.floor(Dimensions.get('window').width * 0.333),
    maxWidth: Math.floor(Dimensions.get('window').width * 0.333)
  },

  twoThirdWidth: {
    width: Math.floor(Dimensions.get('window').width * 0.666),
    maxWidth: Math.floor(Dimensions.get('window').width * 0.666)
  },

  container: {
    flex: 1
  },

  paddedContainer: {
    flex: 1,
    margin: 25
  },

  h1: {
    fontSize: 35,
    fontFamily: 'Roboto'
  },

  h2: {
    fontSize: 30,
    fontFamily: 'Roboto'
  },

  h3: {
    fontSize: 25,
    fontFamily: 'Roboto'
  },

  h4: {
    fontSize: 16,
    fontFamily: 'Roboto'
  },

  p: {
    fontSize: 14,
    fontFamily: 'Roboto'
  },

  rows: {
    flexDirection: 'row'
  },

  columns: {
    flexDirection: 'column'
  },

  centered: {
    alignItems    : 'center',
    justifyContent: 'center'
  },

  wrapped: {
    flex: 1,
    flexWrap: 'wrap'
  },

  leftmost: {
    justifyContent: 'flex-start'
  },

  textCentered: {
    textAlign: 'center'
  },

  textRighted: {
    textAlign: 'right'
  },

  rightmost: {
    justifyContent: 'flex-end'
  },

  spaceAround: {
    justifyContent: 'space-around'
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },

  spaceStretch: {
    alignItems: 'stretch'
  },

  shadowed: {
    elevation      : 4,
    margin         : 10,
    borderWidth    : 3,
    borderColor    : '#EEEEEE',
    backgroundColor: 'transparent'
  },

  textShadowed: {
    textShadowColor: '#CCCCCC',
    textShadowOffset: {width: 2, height: 2}
  },

  backgroundImageCover: {
    resizeMode: 'cover',
    height    : Dimensions.get('window').height,
    width     : Dimensions.get('window').width
  },

  buttonText: {
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#000000',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  buttonDefault: {
    backgroundColor: 'white',
    borderRadius: 25,
    minWidth    : 100,
    paddingRight: 25,
    paddingLeft : 25,
    height      : 60
  },

  buttonSmall: {
    backgroundColor: 'white',
    borderRadius: 20,
    minWidth    : 60,
    paddingRight: 10,
    paddingLeft : 10,
    height      : 40
  },

  buttonLarge: {
    backgroundColor: 'white',
    borderRadius: 40,
    minWidth    : 125,
    paddingRight: 32,
    paddingLeft : 32,
    height      : 75
  },

  buttonTextSmall: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#000000',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  buttonTextLarge: {
    fontSize: 35,
    fontFamily: 'Roboto',
    color: '#000000',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },

  buttonRound: {
    backgroundColor: 'white',
    borderRadius   : 50,
    minHeight      : 90,
    minWidth       : 90
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000000',
    fontFamily: 'Roboto',
    color: '#000000'
  },

  label: {
    textAlign: 'left',
    minWidth: 140,
    fontSize: 16,
    fontWeight: 'bold'
  },

  inputSmall: {
    paddingTop: 4,
    paddingBottom: 2,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    lineHeight: 15,
    width: 300
  },

  inputLarge: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 30,
    lineHeight: 25,
    width: 500
  }

})