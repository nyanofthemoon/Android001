'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import base from './../../components/Container/styles'

export default StyleSheet.create({

  shadowed: {
    elevation      : 4,
    margin         : 10,
    borderWidth    : 1,
    borderColor    : '#EEEEEE',
    backgroundColor: 'transparent'
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#AAAAAA',
    borderRadius: 300,
    elevation: 10,
    margin: 25
  },

  wheel: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'white',
    borderStyle: 'solid',
    zIndex: 5
  },
  triangle: {
    position: 'absolute',
    borderColor: 'transparent',
    zIndex: 2
  },
  txtContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 3,
    paddingLeft: 30
  },
  txt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 34,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 3},
    position: 'relative',
    top: -3
  },

  logoBack: {
    position: 'relative',
    backgroundColor: 'white',
    zIndex: 6,
    borderRadius: 50,
    width: 100,
    height: 100
  },
  logoContent: {
    position: 'relative',
    top: -5,
    left: -5,
    backgroundColor: 'white',
    zIndex: 7,
    borderRadius: 50,
    width: 88,
    height: 88,
    elevation: 4
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'center',
    position: 'relative',
    top: 15,
    left: 14
  }

})