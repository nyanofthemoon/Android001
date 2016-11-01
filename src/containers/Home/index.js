'use strict'

import React from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

import { goToErrorScene, switchLanguage, goToRegistrationScene, getCampaignDataForCurrentLanguage } from './../../actions'

import Images from './../../helpers/images'

import Container from './../../components/Container'
import Button from './../../components/Button'

import Config from './../../config'

import styles from './styles'

@connect(
  state => ({
    app     : state.app,
    campaign: state.campaign,
    content : state.content
  })
)

export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    campaign: React.PropTypes.object.isRequired,
    content : React.PropTypes.object.isRequired
  }

  //@NOTE Validate Campaign Is Active And Not Expired
  componentWillMount() {
    const {campaign, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let current  = new Date().getTime()
    let start    = campaign.get('date_start')
    let end      = campaign.get('date_end')
    if (current < start) {
      goToErrorScene(contents.GENERIC_ERROR_CAMPAIGN_PENDING)
    } else if (current >= end) {
      goToErrorScene(contents.GENERIC_ERROR_CAMPAIGN_EXPIRED)
    }
  }

  render() {
    const {app, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image key={new Date().getTime()} source={{uri:campaignData.backgroundImage}} style={[styles.backgroundImageCover]}>
          <View style={[styles.container, styles.rows]}>
            <View animation='bounceIn' style={[styles.halfWidth, styles.centered]}>
              <Image source={Images.wheel[language]} style={styles.wheel}/>
            </View>
            <View style={styles.container}>
              <View style={[styles.halfWidth, styles.columns, styles.spaceAround]}>
                  <Image source={{uri:campaignData.sponsorImage}} style={styles.sponsor}/>
                  <Animatable.Text animation='flipInX' duration={1000} iterationCount={1} style={[styles.h3, styles.textCentered, styles.textShadowed, campaignData.frontPrimaryStyle]}>{contents.HOME_INSTRUCTION_PURCHASE}</Animatable.Text>
                  <Animatable.Text animation='flipInX' duration={1000} iterationCount={1} style={[styles.h2, styles.textCentered, styles.textShadowed, campaignData.frontTiertiaryStyle]}>{campaignData.content.announcement}</Animatable.Text>
                  <Animatable.Text animation='flipInX' duration={1000} iterationCount={1} style={[styles.h1, styles.textCentered, styles.textShadowed, campaignData.frontPrimaryStyle]}>{contents.HOME_INSTRUCTION_SPIN}</Animatable.Text>
                  <View style={[styles.prizeContainer, {marginLeft: 50}]}>
                    {campaignData.prizes.map((prize, i) => {
                      return <Animatable.Text animation='slideInLeft' delay={750} duration={(1000+(333*i))} iterationCount={1} style={[{zIndex: 5}, styles.h2, campaignData.frontStyle]}>• {prize.name}</Animatable.Text>
                    })}
                  </View>
                </View>
                <Animatable.View animation='fadeInUpBig' delay={2000} duration={750} iterationCount={1} style={[{marginTop: 40}, styles.rows, styles.centered, styles.spaceAround]}>
                  <Button type='round' text={contents.GENERIC_LANGUAGE_BUTTON} handleOnPress={switchLanguage}/>
                  <Animatable.View animation='pulse' duration={1000} iterationCount='infinite'>
                    <Button text={contents.HOME_BUTTON} handleOnPress={goToRegistrationScene}/>
                  </Animatable.View>
                </Animatable.View>
              </View>
            </View>
        </Image>
      </Container>
    )
  }
}