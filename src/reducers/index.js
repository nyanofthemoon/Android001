'use strict'

import { combineReducers } from 'redux'

import app from './app'
import content from './content'
import merchant from './merchant'
import campaign from './campaign'
import customer from './customer'
import employee from './employee'

export default combineReducers({
  app,
  content,
  merchant,
  campaign,
  customer,
  employee
})