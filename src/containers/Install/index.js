'use strict'

import React from 'react'
import { NetInfo, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
var Spinner = require('react-native-spinkit')

import { establishDatabaseConnection } from './../../helpers/database'
import Images from './../../helpers/images'
import { handleAppMerchantDataInstallation, handleAppConnectivityChange } from './../../actions'

import Container from './../../components/Container'
import MerchantIdentificationForm from './../../components/MerchantIdentificationForm'

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

  componentDidMount() {
    NetInfo.isConnected.fetch().then(handleAppConnectivityChange)
    establishDatabaseConnection()
  }

  render() {
    const {app, content} = this.props
    let contents = content.get(content.get('language')).toJSON()
    switch (app.get('installed')) {
      default:
        return (
          <Container>
            <View style={[styles.container, styles.centered, styles.spaceAround, styles.backgroundColor]}>
              <Spinner size={200} type='FadingCircleAlt' color='#EEEEEE'/>
              <Text style={[styles.text, styles.p]}>{app.get('installedStep')}</Text>
            </View>
          </Container>
        )
      case 'uninstalled':
        return (
          <Container loading={app.get('loading')}>
            <Image source={Images.installationCover} style={[styles.container, styles.backgroundImageCover]}>
              <MerchantIdentificationForm contents={contents} handleSubmission={handleAppMerchantDataInstallation}/>
            </Image>
          </Container>
        )
    }
  }

}