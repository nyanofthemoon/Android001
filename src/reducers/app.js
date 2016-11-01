'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  loading      : false,
  state        : 'active',        //@NOTE active, background
  status       : 'ok',            //@NOTE ok, crashed
  statusMessage: '',
  scene        : 'install',       //@NOTE See Containers
  sceneLast    : 0,
  connectivity : 'offline',       //@NOTE offline, online
  installed    : 'checking',      //@NOTE checking, installing, installed, uninstalled
  installedStep: 'Please Wait',
  version      : 'valid',         //@NOTE valid, invalid
  sync         : 'synced'         //@NOTE syncing, synced
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break

    case constants.APPLICATION_STATE_CHANGED:
      nextState = state.set('state', action.payload)
      break
    case constants.APPLICATION_CONNECTIVITY_CHANGED:
      nextState = state.set('connectivity', action.payload)
      break
    case constants.APPLICATION_CRITICAL_ERROR:
      nextState = state.merge({
        scene        : 'error',
        status       : 'crashed',
        statusMessage: action.payload.toString()
      })
      break
    case constants.APPLICATION_VERSION_ERROR:
      nextState = state.set('version', 'invalid')
      break

    case constants.APPLICATION_INSTALLATION_CHANGED:
      nextState = state.set('installed', action.payload)
      break
    case constants.APPLICATION_INSTALLATION_STEP_CHANGED:
      nextState = state.set('installedStep', action.payload)
      break

    case constants.SCENE_NAVIGATION_HOME:
      nextState = state.merge({scene: 'home', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_REGISTRATION:
      nextState = state.merge({scene: 'registration', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_IDENTIFICATION:
      nextState = state.merge({scene: 'identification', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_PURCHASE:
      nextState = state.merge({scene: 'purchase', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_PLAY:
      nextState = state.merge({scene: 'play', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_THANKS:
      nextState = state.merge({scene: 'thanks', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_GENERIC:
      nextState = state.merge({scene: 'generic', sceneLast: new Date().getTime()})
      break
    case constants.SCENE_NAVIGATION_EMPLOYEE:
      nextState = state.merge({scene: 'employee', sceneLast: new Date().getTime()})
      break

    case constants.APPLICATION_STARTED_LOADING:
      nextState = state.set('loading', true)
      break
    case constants.APPLICATION_ENDED_LOADING:
      nextState = state.set('loading', false)
      break

  }
  return nextState || state
}