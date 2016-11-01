'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  list   : {},
  current: null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break

    case constants.APP_RESET:
      nextState = state.set('current', null)
      break

    case constants.API_PULL_EMPLOYEES_RESPONSE:
      let employees = {}
      action.payload.forEach((employee) => {
        employees[employee.pin] = employee
      })
      nextState = state.set('list', fromJS(employees))
      break

    case constants.APP_EMPLOYEE_SUBMISSION:
      nextState = state.set('current', action.payload)
      break

  }
  return nextState || state
}