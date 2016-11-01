'use strict'

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

import Svg,{
  Ellipse,
  RadialGradient,
  Defs,
  Stop
} from 'react-native-svg'

import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
let shuffle = require('shuffle-array')

const FBSDK = require('react-native-fbsdk');
const { ShareDialog } = FBSDK;

import { hasNetworkConnection, getCampaignDataForCurrentLanguage, handleAppGameResultSubmission, goToThanksScene } from './../../actions'

import Container from './../../components/Container'
import Button from './../../components/Button'
import Wheel from './../../components/Wheel'

import Sounds from './../../helpers/sounds'
import Images from './../../helpers/images'

import Config from  '../../config'

import styles from './styles'

const WheelArrow = props => {
  const width  = props.size;
  const height = props.size * 3 / 2;
  return (
    <View style={{width, height}}>
      <View style={{width: props.size, position: 'absolute', top: 20, left: 0, zIndex: 100}}>
        <View style={{width: props.size, height: props.size / 2, backgroundColor: props.color}}/>
        <View style={{borderTopWidth: 10, borderLeftWidth: props.size/2, borderRightWidth: props.size/2, borderBottomWidth: 10, borderColor: 'transparent', borderTopColor: props.color}}/>
      </View>
      <View style={{width: props.size, position: 'absolute', top: 23, left: 3, zIndex: 99, opacity: 0.5}}>
        <View style={{width: props.size, height: props.size / 2, backgroundColor: 'black'}}/>
        <View style={{borderTopWidth: 10, borderLeftWidth: props.size/2, borderRightWidth: props.size/2, borderBottomWidth: 10, borderColor: 'transparent', borderTopColor: 'black'}}/>
      </View>
    </View>
  )
}

class SVGOverlay extends Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    return !(width && height) ? null : (
      <Svg
        height={height}
        width={width}
      >
        <Defs>
          <RadialGradient id="grad">
            <Stop
              offset="0"
              stopColor="#fff"
              stopOpacity="1"
            />
            <Stop
              offset="0.5"
              stopColor="#fff"
              stopOpacity="0.75"
            />
            <Stop
              offset="1"
              stopColor="#fff"
              stopOpacity="0"
            />
          </RadialGradient>
        </Defs>
        <Ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} fill="url(#grad)"/>
      </Svg>
    )
  }
}

@connect(
  state => ({
    app     : state.app,
    content : state.content,
    customer: state.customer
  })
)
export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    content : React.PropTypes.object.isRequired,
    customer: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      layout: {},
      ended: false,
      direction: null,
      angle: 0,
      prev: 0,
      spinDuration: 0,
      prize: '',
      prizes: []
    }

    this._handleRotationChange = this._handleRotationChange.bind(this);
    this._handleRotationStart = this._handleRotationStart.bind(this);
    this._handleRotationStop = this._handleRotationStop.bind(this);
  }

  componentWillMount() {
    let campaignData = getCampaignDataForCurrentLanguage()
    let frequencyTotal = campaignData.prizes.reduce((acc, curr) => { return acc + curr.frequency }, 0)
    let prizes         = []
    let prizeAt        = 0;
    campaignData.prizes.forEach((prize) => {
      var probability = prize.frequency/frequencyTotal/prize.display
      for (let i=1; i<=prize.display; i++) {
        prizes.push({
          prize_id  : prize.prize_id,
          name      : prize.name,
          name_short: prize.name_short,
          angle     : 0,
          prob      : probability
        })
        prizeAt++
      }
    })
    prizes.sort(function(a, b) { return a.prob - b.prob })
    let bigPrize = prizes.shift()
    shuffle(prizes)
    prizes.forEach((prize, i) => {
      prize.angle = (i + 1) * -22.5
    })
    prizes.unshift(bigPrize)
    this.setState({
      prizes      : prizes,
      spinDuration: Math.floor(Math.random() * (Config.wheel.maxRotation - Config.wheel.minRotation + 1) + Config.wheel.minRotation)
    })
  }

  _handleShareButtonPressed() {
    let campaignData = getCampaignDataForCurrentLanguage()
    const shareLinkContent = {
      contentType       : 'link',
      contentUrl        : campaignData.shareUrl,
      contentDescription: campaignData.content.share || ''
    }
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) { return ShareDialog.show(shareLinkContent) }
      }
    ).then(
      function(result) {
        if (result.postId) {
          goToThanksScene()
        }
      }
    )
  }

  _handleRotationStart(direction) {
    this.setState({direction})
  }

  _handleRotationStop() {
    let that = this
    handleAppGameResultSubmission(this.state.prizes[this.state.prize], () => {
      setTimeout(()=>{
        that.setState({ ended: true })
        Sounds.applause.play()
      }, 250)
    }, (error) => {
      let language = this.props.content.get('language')
      Alert.alert(
        that.props.content.getIn([language, 'GENERIC_ERROR_MESSAGE']),
        error.toString()
      )
    })
  }

  _handleRotationChange(angle) {
    if (this.state.direction && false === this.state.ended) {
      this.setState({
        angle: angle,
        prize: this._calculateRadian(angle)
      })
      if (Math.abs(angle-this.state.prev) >= 22.5) {
        if (!this.playing) {
          this.playing = true;
          Sounds.tick.play(
            () => this.playing = false
          )
        } else {
          Sounds.tick.setCurrentTime(0)
        }
        this.setState({
          prev : angle
        })
      }
    }
  }

  _calculateRadian(angle) {
    let partDegree     = 360 / Config.wheel.parts;
    let ang = angle % 360;
    if (ang < 0) {
      ang = ang + 360;
    }
    return (Config.wheel.parts - Math.floor((ang) / partDegree)) % 16;
  }

  render() {
    const {app, content, customer} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    let isOnline = hasNetworkConnection()
    let providerIsFacebook = customer.getIn(['registration', 'facebookId']) ? true : false
    let gameHasEnded = this.state.ended
    let gameOverlay = null
    let gameAnimation = null
    let gameOverlayButton = null
    let gameBottomButtons = null
    let prize = ''
    if (this.state.prizes[this.state.prize]) {
      prize = this.state.prizes[this.state.prize].name
    }
    let prizeContainer = null
    if (false === gameHasEnded) {
      prizeContainer = (
        <View style={[styles.centered, styles.shadowed, styles.prizeContainer]}>
          <Animatable.Text style={[styles.h3, styles.textShadowed, styles.textCentered]} animation='rubberBand' duration={500} iterationCount={'infinite'}>{prize}</Animatable.Text>
        </View>
      )
    } else {
      prizeContainer = (
        <View style={[styles.centered, styles.shadowed, styles.prizeContainer]}>
          <Text style={[styles.h3, styles.textShadowed, styles.textCentered]}>{prize}</Text>
        </View>
      )
      if (true === isOnline && true === providerIsFacebook && campaignData.shareUrl && campaignData.shareUrl.length > 1) {
        gameOverlayButton = (
          <Animatable.View animation='pulse' duration={1000} iterationCount='infinite'>
            <Button type='facebook' text={contents.PLAY_SHARE_BUTTON} style={{elevation:21}} handleOnPress={this._handleShareButtonPressed.bind(this)}/>
          </Animatable.View>
        )
        gameBottomButtons = <Button type='small' text={contents.PLAY_CONTINUE_BUTTON} handleOnPress={goToThanksScene}/>
      } else {
        gameOverlayButton = (
          <Animatable.View animation='pulse' duration={1000} iterationCount='infinite'>
            <Button text={contents.PLAY_CONTINUE_BUTTON} handleOnPress={goToThanksScene}/>
          </Animatable.View>
        )
      }
      const svgProps = this.state.layout ? {width: this.state.layout.width, height: this.state.layout.height} : {};
      gameOverlay = (
        <Animatable.View onLayout={({nativeEvent: {layout}}) => this.setState({layout})} animation='fadeInDownBig' delay={500} duration={1000} iterationCount={1} style={styles.overlay}>
        <SVGOverlay {...svgProps}/>
        <View style={[styles.overlay, styles.columns, styles.centered, styles.spaceAround, {postition:'absolute', top:250, height: 300, zIndex:100}]}>
          <Text style={[styles.h2, styles.textShadowed]}>{contents.PLAY_RESULT_TITLE}</Text>
          <Animatable.Text animation='zoomIn' delay={1500} duration={1000} iterationCount={1} style={[styles.h1, styles.textShadowed]}>{prize}</Animatable.Text>
          <View style={[styles.rows, styles.centered]}>
            {gameOverlayButton}
          </View>
        </View>
      </Animatable.View>)
      gameAnimation = <Animatable.Image animation='fadeOut' duration={1000} delay={2500} key='middle-fireworks' source={Images.fireworks} style={{position:'absolute',top:25,left:-50,zIndex:99,resizeMode:'cover', width:1150,height:800}}/>
    }
    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image source={{uri:campaignData.wheelStyle.backgroundImage}} style={[styles.container, styles.centered, styles.rows, styles.backgroundImageCover]}>
          {gameAnimation}
          {gameOverlay}
          <View style={[styles.twoThirdWidth]}>
            <View style={{alignItems: 'center'}}>
              <View style={{position: 'absolute', top: -5, left: -2, right: 0, alignItems: 'center'}}>
                <WheelArrow color={campaignData.wheelStyle.tickColor} size={Config.wheel.radius / 8} />
              </View>
              <Wheel
                spinThreshold={Config.wheel.threshold}
                disabled={this.state.ended}
                spinDuration={this.state.spinDuration}
                angleProbs={this.state.prizes}
                onRotationStart={this._handleRotationStart}
                onRotationStop={this._handleRotationStop}
                onRotationChange={this._handleRotationChange}
                preventTouchStop
                parts={Config.wheel.parts}
                radius={Config.wheel.radius}
                primary={campaignData.primaryColor}
                secondary={campaignData.secondaryColor}
                mainText={campaignData.wheelStyle.bigPrizeTextColor} mainBack={campaignData.wheelStyle.bigPrizeBackColor}
                logoImage={campaignData.wheelStyle.logoImage}
              />
            </View>
          </View>
          <View style={[styles.container, styles.oneThirdWidth, styles.columns, styles.spaceAround, {marginLeft:-25}]}>
            <Image source={{uri:campaignData.sponsorImage}} style={styles.sponsor}/>
            <Text style={[styles.h1, styles.textShadowed, styles.textCentered]}>{contents.PLAY_INSTRUCTION}</Text>
            {prizeContainer}
            {gameBottomButtons}
          </View>
        </Image>
      </Container>
    )
  }



}