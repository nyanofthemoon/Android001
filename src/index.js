'use strict'

console.disableYellowBox = true
import './../shim.js'

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux'

import Store from './configureStore'

import Install from './containers/Install'
import Home from './containers/Home'
import Registration from './containers/Registration'
import Identification from './containers/Identification'
import Purchase from './containers/Purchase'
import Play from './containers/Play'
import Thanks from './containers/Thanks'
import Employee from './containers/Employee'
import Generic from './containers/Generic'
import Error from './containers/Error'

const scenes = Actions.create(
  <Scene key='root' hideNavBar={true}>
      <Scene key='install' component={Install} type={ActionConst.RESET} initial={true}/>
      <Scene key='home' component={Home} type={ActionConst.RESET}/>
      <Scene key='registration' component={Registration} type={ActionConst.RESET}/>
      <Scene key='identification' component={Identification} type={ActionConst.RESET}/>
      <Scene key='purchase' component={Purchase} type={ActionConst.RESET}/>
      <Scene key='play' component={Play} type={ActionConst.RESET}/>
      <Scene key='thanks' component={Thanks} type={ActionConst.RESET}/>
      <Scene key='generic' component={Generic} type={ActionConst.RESET}/>
      <Scene key='employee' component={Employee} type={ActionConst.RESET}/>
      <Scene key='error' component={Error} type={ActionConst.RESET}/>
  </Scene>
)

const SpinAndWin = () => (
  <Provider store={Store}>
    <Router scenes={scenes}/>
  </Provider>
)

AppRegistry.registerComponent('SpinAndWin', () => SpinAndWin)