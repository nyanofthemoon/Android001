'use strict'

import {fromJS} from 'immutable'

import * as constants from './../constants'

const initialState = fromJS({
  language: 'fr',
  rotated :  0,
  fr      : {},
  en      : {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    default: break
    case constants.APPLICATION_LANGUAGE_CHANGED:
      nextState = state.merge({
        language: action.payload.language,
        rotated : action.payload.rotated
      })
      break
    case constants.API_PULL_CONTENT_RESPONSE:
      let fr = {}
      let en = {}
      action.payload.forEach((content) => {
        fr[content.label] = content.fr
        en[content.label] = content.en
      })
      nextState = state.merge({
        fr: fr,
        en: en
      })
      break

  }
  return nextState || state
}