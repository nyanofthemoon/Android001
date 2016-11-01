'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  pin        : null,
  merchant_id: null,
  name       : null,
  address    : null,
  phone      : null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break

    case constants.API_PULL_MERCHANT_RESPONSE:
      nextState = state.merge(action.payload)
      break

  }
  return nextState || state
}