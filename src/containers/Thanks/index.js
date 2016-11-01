'use strict'

import React from 'react'
import { View, Image, Text } from 'react-native'

import { getCampaignDataForCurrentLanguage, hasNetworkConnection } from './../../actions'

import { connect } from 'react-redux'

import Container from './../../components/Container'

import Images from './../../helpers/images'

import styles from './styles'

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

  render() {
    const {app, content, customer} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    let prizeName = customer.getIn(['prize', 'name'])

    let privacy = null
    if (true === hasNetworkConnection()) {
      privacy = (<View style={[styles.container, styles.rows, styles.centered]}>
        <Image source={Images.lock} style={styles.lock}/>
        <Text style={[styles.p, styles.wrapped, campaignData.frontStyle]}>{contents.THANKS_PRIVACY_MESSAGE}</Text>
      </View>)
    }

    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.backgroundImageCover]}>
          <View style={[styles.container, styles.fullHeight, styles.centered, styles.rows]}>
            <Image source={{uri:campaignData.thanksImage}} resizeMode='center' style={{width:500,height:600}}/>
            <View style={[styles.container, styles.halfWidth, styles.columns, styles.centered, styles.spaceAround, {padding:25, paddingTop:0, paddingBottom:50}]}>
              <Image source={{uri:campaignData.sponsorImage}} resizeMode='center' style={{width:200,height:185, paddingBottom:25}}/>
              <Text style={[styles.h2, styles.textShadowed, styles.textCentered, campaignData.frontStyle]}>{contents.THANKS_TITLE}</Text>
              <View style={[styles.container, styles.columns, styles.centered, {marginTop:75}]}>
                <Text style={[styles.h1, styles.textShadowed, campaignData.frontStyle]}>{contents.THANKS_PRIZE_TITLE}</Text>
                <Text style={[styles.h1, styles.textShadowed,  campaignData.frontStyle]}>{prizeName}</Text>
              </View>
              {privacy}
              <Text style={[styles.h4, campaignData.frontStyle]}>{contents.THANKS_INSTRUCTION_MESSAGE}</Text>
            </View>
          </View>
        </Image>
      </Container>
    )
  }

}