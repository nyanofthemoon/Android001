'use strict'

import React from 'react'
import { Image, Text } from 'react-native'

import { getCampaignDataForCurrentLanguage } from './../../actions'

import { connect } from 'react-redux'

import Container from './../../components/Container'

import styles from './styles'

@connect(
  state => ({
    app    : state.app,
    content: state.content
  })
)

export default class extends React.Component {
  static propTypes = {
    app    : React.PropTypes.object.isRequired,
    content: React.PropTypes.object.isRequired
  }

  render() {
    const {app, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.container, styles.backgroundImageCover]}>
          <Text>Generic Screen</Text>
        </Image>
      </Container>
    )
  }

}