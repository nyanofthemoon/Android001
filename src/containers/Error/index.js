'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import Container from './../../components/Container'

import styles from './styles'

@connect(
  state => ({
    app: state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired
  }

  render() {
    const {app} = this.props
    return (
      <Container>
        <View style={[styles.container, styles.centered, styles.spaceAround]}>
          <Text style={styles.h1}>Fatal Error</Text>
          <Text style={styles.h2}>Please Relaunch Application</Text>
          <Text style={styles.h3}>{app.get('statusMessage')}</Text>
        </View>
      </Container>
    )
  }
}