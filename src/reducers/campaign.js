'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  campaign_id : null,
  sponsor     : null,
  date_start  : null,
  date_end    : null,
  url_campaing: null,
  content: {
    fr: {},
    en: {}
  },
  style: {},
  prizes: []
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break

    case constants.API_PULL_CAMPAIGNS_RESPONSE:
      nextState = state.merge(action.payload)
      break

  }
  return nextState || state
}