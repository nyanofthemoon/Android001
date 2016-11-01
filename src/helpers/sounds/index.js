// https://github.com/zmxv/react-native-sound

'use strict'

var Sound = require('react-native-sound')

export default {
  theme   : new Sound('theme.mp3', Sound.MAIN_BUNDLE),
  scan    : new Sound('scan.mp3', Sound.MAIN_BUNDLE),
  tick    : new Sound('tick.mp3', Sound.MAIN_BUNDLE),
  applause: new Sound('applause.mp3', Sound.MAIN_BUNDLE)
}