'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  registration: {
    birthday        : null,
    firstName       : null,
    lastName        : null,
    email           : null,
    phone           : null,
    gender          : null,
    facebookId      : null,
    facebookAgeRange: null,
    emailPromo      : null,
    language        : null,
  },
  employee        : {},
  purchase        : [],
  prize           : {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break

    case constants.APP_RESET:
      nextState = initialState
      break

    case constants.APP_CUSTOMER_SUBMISSION:
      nextState = state.set('registration', fromJS(action.payload))
      break

    case constants.APP_EMPLOYEE_SUBMISSION:
      nextState = state.set('employee', fromJS(action.payload))
      break

    case constants.APP_PURCHASE_SUBMISSION:
      nextState = state.set('purchase', fromJS(action.payload))
      break

    case constants.APP_GAME_SUBMISSION:
      nextState = state.set('prize', fromJS(action.payload))
      break

  }
  return nextState || state
}