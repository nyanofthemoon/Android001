import React, { Component } from 'react'
import { View, Text, PanResponder } from 'react-native'
import DatePicker from 'react-native-datepicker'

import Images from './../../helpers/images'

import styles from './styles'

export default class DateInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      //onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      //onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      //onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      //onPanResponderMove: (e) => console.log('onPanResponderMove'),
      //onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      //onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  render() {
    return (
      <View style={styles.container}
        {...this._panResponder.panHandlers}
      >
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="placeholder"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={Images.calendar}
          onDateChange={(date) => {this.setState({date: date});}}
        />
        <Text style={styles.instructions}>date: {this.state.date}</Text>
      </View>
    )
  }

}