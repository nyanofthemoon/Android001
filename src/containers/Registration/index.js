'use strict'

import React from 'react'
import { View, Alert, Image, Text, TouchableWithoutFeedback  } from 'react-native'
import { connect } from 'react-redux'

import { hasNetworkConnection, getCampaignDataForCurrentLanguage, handleAppCustomerRegistration, goToIdentificationScene } from './../../actions'

import Images from './../../helpers/images'

import Container from './../../components/Container'
import CustomerRegistrationForm from './../../components/CustomerRegistrationForm'
import CustomerFacebookForm from './../../components/CustomerFacebookForm'

import styles from './styles'

@connect(
  state => ({
    app    : state.app,
    content: state.content
  })
)

//@NOTE AWAITING FACEBOOK API ETC

export default class extends React.Component {
  static propTypes = {
    app    : React.PropTypes.object.isRequired,
    content: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      overlay: {backgroundColor:'#000000', opacity: 0.25, zIndex:1000}
    }
  }

  _handleCustomerRegistration(data) {
    let language  = this.props.content.get('language')
    data.language = language
    handleAppCustomerRegistration(data, goToIdentificationScene)
  }

  _removeOpacity() {
    this.setState({overlay:{}})
  }

  render() {
    const {app, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    let leftContent = <Image source={Images.wheel[language]} style={styles.wheel}/>
    let borderLeft     = {}
    let borderSepLeft  = null
    let borderSepRight = null
    if (true === hasNetworkConnection()) {
      leftContent = <CustomerFacebookForm contents={contents} campaign={campaignData} handleSubmission={this._handleCustomerRegistration.bind(this)}/>
      borderLeft  = { borderLeftWidth: 1 }
      if ('fr' === language) { borderSepRight = 'U' }
      borderSepLeft  = <Text style={styles.sepLeft}>O</Text>
      borderSepRight = <Text style={styles.sepRight}>{(('fr' === language) ? 'U' : 'R')}</Text>
    }
    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.container, styles.rows, styles.backgroundImageCover]}>
          <View style={[styles.container, styles.centered, styles.halfWidth]}>
            {borderSepLeft}
            {leftContent}
          </View>
          <TouchableWithoutFeedback style={[styles.overlayStyle, this.state.overlayStyle]} onPress={this._removeOpacity.bind(this)}>
            <View style={[styles.container, styles.halfWidth, borderLeft]}>
              {borderSepRight}
              <View style={[styles.container, this.state.overlay]}>
                <CustomerRegistrationForm language={language} contents={contents} campaign={campaignData} handleSubmission={this._handleCustomerRegistration.bind(this)} removeOpacity={this._removeOpacity.bind(this)}/>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Image>
      </Container>
    )
  }
}