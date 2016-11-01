'use strict'

import React from 'react'
import { TouchableHighlight, View, Alert, Image, Text, ScrollView, TouchableWithoutFeedback, TextInput, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { getCampaignDataForCurrentLanguage, handleAppPurchaseSubmission, goToPlayScene } from './../../actions'

import Container from './../../components/Container'
import Scanner from './../../components/Scanner'
import Button from './../../components/Button'
import ProductInput from './../../components/ProductInput'

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

  constructor(props) {
    super(props)
    this.state = {
      scanning: true,
      products: {}
    }
  }

  _calculateFormContents() {
    let finalProducts = {}
    let completed     = false
    for(let i=0; false===completed; i++) {
      let product = this.refs[('product_' + i)]
      if (!product) {
        completed = true
      } else {
        let code = product.state.code || product.props.code
        if ('' !== code) {
          let quantity = product.state.quantity || product.props.quantity
          if (!quantity) {
            quantity = 1
          }
          finalProducts[code] = {code: code, quantity: parseInt(quantity)}
        }
      }
    }
    this.setState({ products: finalProducts })
    return finalProducts
  }

  _handleFormSubmission() {
    let purchase = this._calculateFormContents()
    let contents = []
    Object.keys(purchase).forEach((key) => {
      contents.push({
        codeBar: purchase[key].code,
        qte    : purchase[key].quantity
      })
    })
    handleAppPurchaseSubmission(contents, () => {
      goToPlayScene()
    }, (error) => {
      console.log(error)
    })
  }

  _removeProductInput(key) {
    let products  = this.state.products
    delete(products[key])
    this.setState({ products: products })
  }

  _addProductInput() {
    let now       = new Date().getTime()
    let products  = this.state.products
    products[now] = {code:'', quantity:''}
    this.setState({ products: products })
  }

  _handleScannerSubmission(submission) {
    let products = this.state.products
    Object.keys(submission).forEach((code) => {
      if (!products[code]) {
        products[code] = {code:code, quantity:''}
      }
      products[code].quantity += parseInt(submission[code])
    })
    this.setState({
      scanning: false,
      products: products
    })
  }

  _startScanning() {
    this._calculateFormContents()
    this.setState({ scanning: true })
  }

  render() {
    const {app, content} = this.props
    let language = content.get('language')
    let contents = content.get(language).toJSON()
    let campaignData = getCampaignDataForCurrentLanguage()
    let scanner = null
    if (true === this.state.scanning) {
      scanner = (<Scanner contents={contents} handleSubmission={this._handleScannerSubmission.bind(this)}/>)
    }
    let products = this.state.products
    return (
      <Container loading={app.get('loading')} style={[campaignData.backStyle]}>
        {scanner}
        <Image source={{uri:campaignData.backgroundImage}} style={[styles.container, styles.backgroundImageCover]}>
        <View style={[styles.paddedContainer, styles.columns, styles.spaceAround]}>
          <ScrollView contentContainerStyle={[styles.centered, styles.columns]}>
            {Object.keys(products).map((key, i) => {
              return (
                <View>
                  <ProductInput key={key} ref={'product_' + i} code={products[key].code} quantity={products[key].quantity.toString()}/>
                  <TouchableWithoutFeedback onPress={this._removeProductInput.bind(this, key)}>
                    <View style={styles.removeButton}><Text style={styles.removeText}>X</Text></View>
                  </TouchableWithoutFeedback>
                </View>
              )
            })}
            <Button text={contents.PURCHASE_ADD_NEW} handleOnPress={this._addProductInput.bind(this)} />
          </ScrollView>
        <View style={[styles.centered, styles.rows, styles.spaceBetween]}>
        <Button text={contents.PURCHASE_SCAN_START} handleOnPress={this._startScanning.bind(this)} />
        <Button text={contents.PURCHASE_BUTTON} handleOnPress={this._handleFormSubmission.bind(this)} />
        </View>
        </View>
        </Image>
      </Container>
    )
  }
}