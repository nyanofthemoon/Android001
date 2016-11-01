'use strict';

// https://developer.mozilla.org/en-US/docs/Web/API/Request

/* API NOTES
 *
 * If API HMAC Signature fails, it returns status 401 Unauthorized
 * If API GET requests is successfull but it found nothing, it returns status 200 an empty JSON Object {}
 * GetCampaigns returns only ACTIVE campaigns
 *
*/

import { createHmac } from 'react-native-crypto'

import Config from './../config'
import * as constants from './../constants'

export function ping(success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.getPing
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] GET ' + url)
  }
  fetch(
    url, {
      method : 'GET',
      headers: _generateHeaders(path)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PING_RESPONSE, success)
  })
  .catch(function(error) {
    return failure(constants.API_PING_RESPONSE, error)
  })
}

export function pullContent(success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.getContent
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] GET ' + url)
  }
  fetch(
    url, {
      method : 'GET',
      headers: _generateHeaders(path)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PULL_LANGUAGE_RESPONSE, success)
  }).catch((error) => {
    return failure(constants.API_PULL_LANGUAGE_RESPONSE, error)
  })
}

export function pullMerchant(pin, success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.getMerchant + '/' + pin
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] GET ' + url)
  }
  fetch(
    url, {
      method : 'GET',
      headers: _generateHeaders(path)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PULL_MERCHANT_RESPONSE, success)
  }).catch((error) => {
    return failure(constants.API_PULL_MERCHANT_RESPONSE, error)
  })
}

export function pullEmployees(pin, success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.getEmployees + '/' + pin
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] GET ' + url)
  }
  fetch(
    url, {
      method : 'GET',
      headers: _generateHeaders(path)
    }
  ).then((response) => {
      _formatResponse(response, constants.API_PULL_EMPLOYEES_RESPONSE, success)
  })
  .catch((error) => {
    return failure(constants.API_PULL_EMPLOYEES_RESPONSE, error)
  })
}

export function pullActiveCampaign(pin, success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.getCampaigns + '/' + pin
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] GET ' + url)
  }
  fetch(
    url, {
      method : 'GET',
      headers: _generateHeaders(path)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PULL_CAMPAIGNS_RESPONSE, success)
  })
  .catch((error) => {
    return failure(constants.API_PULL_CAMPAIGNS_RESPONSE, error)
  })
}

export function pushParticipation(participation, success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.postParticipation
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] POST ' + url)
  }
  fetch(
    url, {
      method : 'POST',
      headers: _generateHeaders(path),
      body   : _formatBody(participation)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PUSH_PARTICIPATION_RESPONSE, success)
  })
  .catch((error) => {
    return failure(constants.API_PUSH_PARTICIPATION_RESPONSE, error)
  })
}

export function pushEmployee(employee, success, failure) {
  let path = Config.api.path + Config.api.version + Config.api.action.postEmployee
  let url  = Config.api.getBaseUrl() + path
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] POST ' + url)
  }
  fetch(
    url, {
      method : 'POST',
      headers: _generateHeaders(path),
      body   : _formatBody(employee)
    }
  ).then((response) => {
    _formatResponse(response, constants.API_PUSH_EMPLOYEE_RESPONSE, success)
  })
  .catch((error) => {
    console.log(error.toString())
    return failure(constants.API_PUSH_EMPLOYEE_RESPONSE, error)
  })
}

function _formatResponse(response, type, callback) {
  let status  = response.status
  let headers = response.headers.map
  if (true === Config.environment.isDevelopment()) {
    console.log('[API RESPONSE] HTTP Status ' + status)
    console.log('[API RESPONSE] HTTP Headers', headers)
  }
  response.text().then(function(text) {
    if (true === Config.environment.isDevelopment()) {
      console.log('[API RESPONSE]', text)
    }
    let json = JSON.parse(text)
    let inserted = true
    //@NOTE API POST Request Formats
    // Success = {'type': 'success'}
    // Error   = {'type': 'error'}
    if (json.type && 'error' === json.type) {
      inserted = false
    }
    callback(type, {
      headers    : headers,
      status     : status,
      payload    : json,
      inserted   : inserted
    })
  }).catch(function(error) {
    console.log('[API RESPONSE]', error.toString())
    callback(type, {
      headers    : {},
      status     : 404,
      payload    : {},
      inserted   : false
    })
  })
}

function _formatBody(data) {
  try {
    if (true === Config.environment.isDevelopment()) {
      console.log('[API REQUEST] Payload', data)
    }
    //@NOTE Api Only Accepts application/x-www-form-urlencoded
    return 'json=' + encodeURIComponent(JSON.stringify(data))
  } catch (e) {
    return {}
  }
}

function _generateHeaders(path) {
  let nonce     = new Date().getTime().toString()
  let message   = nonce + Config.api.public_key + path;
  let signature = createHmac('sha256', Config.api.secret_key).update(new Buffer(message, 'utf-8')).digest('base64').toUpperCase()
  if (true === Config.environment.isDevelopment()) {
    console.log('[API REQUEST] X-APP-VERSION        = ' + Config.application.version)
    console.log('[API REQUEST] X-APP-VERSION-ID     = ' + Config.application.app_version_id)
    console.log('[API REQUEST] X-API-KEY            = ' + Config.api.public_key)
    console.log('[API REQUEST] X-API-AUTH-NONCE     = ' + nonce)
    console.log('[API REQUEST] X-API-AUTH-SIGNATURE = ' + signature)
  }
  return {
    'Accept'              : 'application/json',
    'Content-Type'        : 'application/x-www-form-urlencoded',
    'X-APP-VERSION-ID'    : Config.application.app_version_id,
    'X-API-KEY'           : Config.api.public_key,
    'X-API-AUTH-NONCE'    : nonce,
    'X-API-AUTH-SIGNATURE': signature
  }
}