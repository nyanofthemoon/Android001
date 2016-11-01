'use strict'

import React from 'react'
import { Image, View, Text, Alert, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

import { getCampaignDataForCurrentLanguage, hasNetworkConnection, handleAppEmployeeCreation, hideKeyboard } from './../../actions'

import Container from './../../components/Container'
import Button from './../../components/Button'
import EmployeeForm from './../../components/EmployeeForm'
import EmployeeInfo from './../../components/EmployeeInfo'

import styles from './styles'

@connect(
  state => ({
    app     : state.app,
    content : state.content,
    employee: state.employee
  })
)

export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    content : React.PropTypes.object.isRequired,
    employee: React.PropTypes.object.isRequired
  }
s
  handleFormSubmission(data) {
    handleAppEmployeeCreation(data, () => {}, (error) => {
      let language = this.props.content.get('language')
      Alert.alert(
        this.props.content.getIn([language, 'GENERIC_ERROR_MESSAGE']),
        error.toString()
      )
    })
  }

  render() {
    const {app, content, employee} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    let employees = employee.get('list').toJSON()
    return (
      <Container loading={app.get('loading')} style={[campaignData.backStyle]}>
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.container, styles.backgroundImageCover]}>
          <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={[styles.paddedContainer, styles.rows]}>
              <View style={[styles.halfWidth]}>
                <Text style={[styles.h2, styles.textShadowed, campaignData.frontStyle, {marginBottom:25}]}>{contents.EMPLOYEE_TITLE}</Text>
                {Object.keys(employees).map((pin) => {
                  if (1 === employees[pin].is_valid) {
                    return <EmployeeInfo data={employees[pin]} />
                  }
                })}
              </View>
              <View style={[styles.halfWidth]}>
                <Text style={[styles.h2, campaignData.frontStyle, {marginBottom:25}]}> </Text>
                <EmployeeForm style={{marginTop:100}} contents={contents} campaign={campaignData} handleSubmission={this.handleFormSubmission.bind(this)} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Image>
      </Container>
    )
  }
}




