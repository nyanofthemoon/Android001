'use strict'

import React from 'react'
import { Alert, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import { handleAppEmployeeIdentification, getCampaignDataForCurrentLanguage, goToPurchaseScene } from './../../actions'

import Images from './../../helpers/images'

import Container from './../../components/Container'
import EmployeeIdentificationForm from './../../components/EmployeeIdentificationForm'

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

  handleFormSubmission(pin) {
    let that = this
    handleAppEmployeeIdentification(pin, () => {
      goToPurchaseScene()
    }, (error) => {
      let language = this.props.content.get('language')
      Alert.alert(
        this.props.content.getIn([language, 'GENERIC_ERROR_MESSAGE']),
        this.props.content.getIn([language, 'IDENTIFICATION_ERROR_EMPLOYEE_NOT_FOUND'])
      )
    })
  }

  render() {
    const {app, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    return (
      <Container loading={app.get('loading')} style={campaignData.backStyle}>
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.container, styles.centered, styles.backgroundImageCover]}>
          <EmployeeIdentificationForm contents={contents} campaign={campaignData} handleSubmission={this.handleFormSubmission.bind(this)}/>
        </Image>
      </Container>
    )
  }

}