'use strict'

import dismissKeyboard from 'dismissKeyboard'
const timer = require('react-native-timer')
const FBSDK = require('react-native-fbsdk')
const { LoginManager } = FBSDK
import { Actions } from 'react-native-router-flux'

import * as constants from './constants'
import Config from './config'
import Store from './configureStore'

import * as Db  from './helpers/database'
import * as Api from './helpers/api'
import * as Sync from './helpers/sync'

import Merchant from './models/merchant'
import Content from './models/content'
import Campaign from './models/campaign'
import Participation from './models/participation'
import Employee from './models/employee'

import Sounds from './helpers/sounds'

export function hideKeyboard() {
  dismissKeyboard()
}

function handleAppCriticalError(error) {
  if (Config.environment.isDevelopment()) {
    console.log('[handleAppCriticalError]', + error)
  }
  Store.dispatch({
    type   : constants.APPLICATION_CRITICAL_ERROR,
    payload: error
  })
  Actions.error()
}

export function handleAppStateChange(status) {
  if (Config.environment.isDevelopment()) {
    console.log('[handleAppStateChange] changed to ' + status)
  }
  Store.dispatch({
    type: constants.APPLICATION_STATE_CHANGED,
    payload: status
  })
}

export function handleAppConnectivityChange(connected) {
  let status = (connected ? 'online' : 'offline')
  if (Config.environment.isDevelopment()) {
    console.log('[handleAppConnectivityChange] changed to ' + status)
  }
  Store.dispatch({
    type   : constants.APPLICATION_CONNECTIVITY_CHANGED,
    payload: status
  })
}

export function handleAppMemoryWarning() {
  handleAppCriticalError(new Error('Low Memory'))
}

export function handleAppDbConnectionFailure(error) {
  handleAppCriticalError(new Error('Database Connection Failed'))
}

export function handleAppDbConnectionSuccess() {
  Store.dispatch({
    type: constants.APPLICATION_INSTALLATION_STEP_CHANGED,
    payload: 'Verifying Installation'
  })
  Db.databaseSchemaExists(function (exists) {
    if (true === exists) {
      Store.dispatch({
        type: constants.APPLICATION_INSTALLATION_STEP_CHANGED,
        payload: 'Application Linked To Merchant'
      })
      setTimeout(function () {
        handleAppDataInstallation()
      }, 500)
    } else {
      if (true === hasNetworkConnection()) {
        Store.dispatch({
          type: constants.APPLICATION_INSTALLATION_STEP_CHANGED,
          payload: 'Application Not Linked To Merchant'
        })
        setTimeout(function () {
          handleAppSchemaInstallation()
        }, 500)
      } else {
        handleAppCriticalError(new Error('Installation Requires Internet Connection'))
      }
    }
  })
}

export function handleAppSchemaInstallation() {
  Store.dispatch({
    type: constants.APPLICATION_INSTALLATION_CHANGED,
    payload: 'installing'
  })
  Store.dispatch({
    type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
    payload: 'Creating Data Storage'
  })
  Db.resetDatabaseSchema(
    function () {
      Store.dispatch({
        type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
        payload: 'Data Storage Is Ready'
      })
      setTimeout(() => {
        Store.dispatch({
          type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
          payload: 'Syncing Language Content From API'
        })
        Store.dispatch({
          type: constants.API_PULL_CONTENT_REQUEST
        })
        Sync.content().then((content) => {
          Store.dispatch({
            type   : constants.API_PULL_CONTENT_RESPONSE,
            payload: content
          })
          setTimeout(() => {
            Store.dispatch({
              type   : constants.APPLICATION_INSTALLATION_CHANGED,
              payload: 'uninstalled'
            })
          }, 500)
        })
        .catch((err) => {
          handleAppCriticalError(new Error('Content Sync ' + (err.toString() || '')))
        })
      }, 500)
    },
    handleAppCriticalError
  )
}

export function handleAppDataInstallation() {
  Db.merchantDataExists((merchant) => {
    Store.dispatch({
      type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
      payload: 'Reading Merchant Information From Data Storage'
    })
    if (merchant) {
      Store.dispatch({
        type   : constants.API_PULL_MERCHANT_RESPONSE,
        payload: merchant
      })
      setTimeout(() => {
        if (true === hasNetworkConnection() && false === Config.sync.ignore) {
          Store.dispatch({
            type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
            payload: 'Syncing Language Content From API'
          })
          Store.dispatch({
            type: constants.API_PULL_CONTENT_REQUEST
          })
          Sync.content().then((content) => {
            Store.dispatch({
              type   : constants.API_PULL_CONTENT_RESPONSE,
              payload: content
            })
            Store.dispatch({
              type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
              payload: 'Syncing Merchant Information From API'
            })
            handleAppMerchantDataInstallation(merchant.pin)
          })
          .catch((err) => {
            handleAppCriticalError(new Error('Content Sync ' + (err.toString() || '')))
          })
        } else {
          Store.dispatch({
            type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
            payload: 'Reading Language Content From Data Storage'
          })
          Content.getAll((contents) => {
            Store.dispatch({
              type   : constants.API_PULL_CONTENT_RESPONSE,
              payload: contents.map((content) => { return content.data })
            })
            Store.dispatch({
              type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
              payload: 'Reading Employees From Data Storage'
            })
            Employee.getAll((employees) => {
              Store.dispatch({
                type   : constants.API_PULL_EMPLOYEES_RESPONSE,
                payload: employees.map((employee) => { return employee.data })
              })
              Store.dispatch({
                type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
                payload: 'Reading Campaigns From Data Storage'
              })
              Campaign.getAll((campaigns) => {
                Store.dispatch({
                  type   : constants.API_PULL_CAMPAIGNS_RESPONSE,
                  payload: campaigns[0].data
                })
                goToHomeScene()
              })
            })
          })
        }
      }, 500)
    } else {
      if (true === hasNetworkConnection()) {
        Store.dispatch({
          type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
          payload: 'Syncing Language Content From API'
        })
        Sync.content().then((content) => {
          Store.dispatch({
            type   : constants.API_PULL_CONTENT_RESPONSE,
            payload: content
          })
          Store.dispatch({
            type: constants.APPLICATION_INSTALLATION_CHANGED,
            payload: 'uninstalled'
          })
        })
        .catch((err) => {
          handleAppCriticalError(new Error('Content Sync ' + (err.toString() || '')))
        })
      } else {
        handleAppCriticalError(new Error('Installation Requires Internet Connection'))
      }
    }
  })
}

export function handleAppCustomerRegistration(customer, success, failure) {
  if (true === Config.environment.isDevelopment()) {
    console.log('[handleAppCustomerRegistration]', customer)
  }
  _showLoadingOverlay()
  setTimeout(()=>{
     Store.dispatch({
       type   : constants.APP_CUSTOMER_SUBMISSION,
       payload: customer
     })
    _hideLoadingOverlay()
    success()
  }, 250)
}

export function handleAppEmployeeIdentification(pin, success, failure) {
  _showLoadingOverlay()
  setTimeout(()=>{
    let employee = Store.getState().employee.getIn(['list', pin])
    if (employee && 1 === employee.get('is_valid')) {
      employee = employee.toJSON()
      if (true === Config.environment.isDevelopment()) {
        console.log('[handleAppEmployeeIdentification]', employee)
      }
      _hideLoadingOverlay()
      Store.dispatch({
        type   : constants.APP_EMPLOYEE_SUBMISSION,
        payload: employee
      })
      success()
    } else {
      _hideLoadingOverlay()
      failure()
    }
  }, 250)
}

export function handleAppEmployeeCreation(data, success, failure) {
  _showLoadingOverlay()
  setTimeout(()=>{
    if (true === hasNetworkConnection()) {
      let merchantId  = Store.getState().merchant.get('merchant_id')
      let merchantPin = Store.getState().merchant.get('pin')
      let employee    = new Employee(data)
      employee.setUUID(() => {
        let data = {
          employee_first_name: employee.data.first_name,
          employee_last_name : employee.data.last_name,
          merchant_id        : merchantId,
          internal_id        : employee.data.internal_id,
          date_creation_ui   : new Date().getTime(),
          // @NOTE API auto-generates the PIN when it receives this value
          employee_pin       : '000',
          // @NOTE API requires the following information
          date_creation      : '1969-01-11T03:04:47',
          is_valid           : true,
          ip_at_creation     : '127.0.0.1'
        }
        submitApiEmployee(data, (type, result, x) => {
          if ('success' === result.payload.type) {
            // @NOTE Since API auto-generates the PIN, refresh employees list
            Sync.employees(merchantPin).then((employees) => {
              _hideLoadingOverlay()
              Store.dispatch({
                type   : constants.API_PULL_EMPLOYEES_RESPONSE,
                payload: employees
              })
              success()
            }, (error) => {
              console.log(error)
              _hideLoadingOverlay()
              failure(new Error('API Could Not Refresh Employees'))
            })
          } else {
            _hideLoadingOverlay()
            failure(new Error('API Could Not Create Resource'))
          }
        }, (error) => {
          console.log(error)
          _hideLoadingOverlay()
          failure(error)
        })
      })
    } else {
      _hideLoadingOverlay()
      failure(new Error('No internet connection'))
    }
  }, 250)
}

export function handleAppPurchaseSubmission(items, success, failure) {
  if (true === Config.environment.isDevelopment()) {
    console.log('[handleAppPurchaseSubmission]', items)
  }
  Store.dispatch({
    type   : constants.APP_PURCHASE_SUBMISSION,
    payload: items
  })
  setTimeout(()=> {
    success()
  }, 250)
}

export function handleAppGameResultSubmission(prize, success, failure) {
  Store.dispatch({
    type   : constants.APP_GAME_SUBMISSION,
    payload: prize
  })
  let participation = new Participation(Store.getState().campaign, Store.getState().customer)
  participation.setUUID(() => {
    participation.setCoordinates(() => {
      if (true === Config.environment.isDevelopment()) {
        console.log('[handleAppGameResultSubmission]', participation.data)
      }
      participation.save(() => {
        success()
      }, (err) => {
        handleAppCriticalError(new Error('Participation Not Saved ' + err.toString()))
      })
    })
  })
}

export function handleAppMerchantDataInstallation(pin) {
  _showLoadingOverlay()
  Store.dispatch({
    type   : constants.APPLICATION_INSTALLATION_STEP_CHANGED,
    payload: 'Syncing Campaign Information From API'
  })
  Sync.merchant(pin).then((data) => {
    Store.dispatch({
      type   : constants.APPLICATION_INSTALLATION_CHANGED,
      payload: 'installed'
    })
    Store.dispatch({
      type   : constants.API_PULL_MERCHANT_RESPONSE,
      payload: data.merchant
    })
    Store.dispatch({
      type   : constants.API_PULL_CAMPAIGNS_RESPONSE,
      payload: data.campaign
    })
    Store.dispatch({
      type   : constants.API_PULL_EMPLOYEES_RESPONSE,
      payload: data.employees
    })
    //@NOTE Automatically switch language
    timer.setInterval('language', function() {
      if ('home' === Store.getState().app.get('scene')) {
        if ((new Date().getTime() - parseInt(Store.getState().content.get('rotated'))) >= Config.languageInterval) {
          //@NOTE Random Chance Of Theme Music Playing
          if (2 === Math.floor((Math.random() * Config.homeThemeChance))) {
            Sounds.theme.play()
          }
          switchLanguage()
        }
      }
    }, Config.languageInterval)
    //@NOTE Automatically Return to Home Scene If No Activity
    timer.setInterval('inactivity', function() {
      let scene = Store.getState().app.get('scene')
      if (Config.inactivity.excludeScenes.indexOf(scene) === -1)
        if ((new Date().getTime() - Store.getState().app.get('sceneLast')) >= Config.inactivity) {
          goToHomeScene()
        }
    }, Config.inactivity.timeout)
    //@NOTE Initialize Sync : Pulling Content from API
    timer.setInterval('pull', function() {
      if (true === hasNetworkConnection()) {
        Store.dispatch({
          type: constants.APPLICATION_SYNC_CHANGED,
          payload: 'syncing'
        })
        Sync.merchant(pin).then((data) => {
          Store.dispatch({
            type   : constants.APPLICATION_SYNC_CHANGED,
            payload: 'synced'
          })
          Store.dispatch({
            type   : constants.API_PULL_MERCHANT_RESPONSE,
            payload: data.merchant
          })
          Store.dispatch({
            type   : constants.API_PULL_CAMPAIGNS_RESPONSE,
            payload: data.campaign
          })
          Store.dispatch({
            type   : constants.API_PULL_EMPLOYEES_RESPONSE,
            payload: data.employees
          })
        })
        .catch((err) => {
          console.log('[Merchant Sync]', err)
        })
      }
    }, Config.sync.merchant)
    //@NOTE Initialize Sync : Pushing Content to API
    timer.setInterval('push', function() {
      if (true === hasNetworkConnection()) {
        Store.dispatch({
          type: constants.APPLICATION_SYNC_CHANGED,
          payload: 'syncing'
        })
        Sync.participations().then(() => {
          Store.dispatch({
            type: constants.APPLICATION_SYNC_CHANGED,
            payload: 'synced'
          })
        })
        .catch((err) => {
          console.log('[Participation Sync]', err)
        })
      }
    }, Config.sync.participation)
    goToHomeScene()
  })
  .catch((err) => {
    handleAppCriticalError(new Error('Merchant Sync ' + (err.toString() || '')))
  })
}

function _handleApiRequest(type, data) {
  Store.dispatch({type: type, payload: data})
}

function _handleApiResponseSuccess(type, data) {
  switch (data.status) {
    case '200':
    case '201':
    case '204':
    case '304':
      Store.dispatch({type: type, payload: data})
      break
    case '301':
      //@NOTE - Pascal : API Still Allows Sync'ing Participations
      handleAppCriticalError(new Error('Application Update Required'))
      break
    case '401':
      handleAppCriticalError(new Error('API HMAC Signature Mismatch'))
      break
    case '403':
      handleAppCriticalError(new Error('API Access Forbidden'))
      break
    case '404':
      handleAppCriticalError(new Error('API Endpoint Not Found'))
      break
    case '400':
    case '500':
      handleAppCriticalError(new Error('API Endpoint Error'))
      break
    default:
      handleAppCriticalError(new Error('Unexpected API Response'))
      break
  }
}

function _handleApiResponseFailure(type, error) {
  console.log('[API RESPONSE ERROR] ' + type, error)
}

export function queryApiHealthCheck(success, failure) {
  _handleApiRequest(constants.API_PING_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.ping(success, failure)
}

export function queryApiContent(success, failure) {
  _handleApiRequest(constants.API_PULL_CONTENT_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pullContent(success, failure)
}

export function queryApiMerchantByPin(pin, success, failure) {
  _handleApiRequest(constants.API_PULL_MERCHANT_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pullMerchant(pin, success, failure)
}

export function queryApiEmployeesByMerchant(pin, success, failure) {
  _handleApiRequest(constants.API_PULL_EMPLOYEES_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pullEmployees(pin, success, failure)
}

export function queryApiActiveCampaignByMerchant(pin, success, failure) {
  _handleApiRequest(constants.API_PULL_CAMPAIGNS_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pullActiveCampaign(pin, success, failure)
}

export function submitApiParticipation(participation, success, failure) {
  _handleApiRequest(constants.API_PUSH_PARTICIPATION_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pushParticipation(participation, success, failure)
}

export function submitApiEmployee(employee, success, failure) {
  _handleApiRequest(constants.API_PUSH_EMPLOYEE_REQUEST)
  success = success || _handleApiResponseSuccess
  failure = failure || _handleApiResponseFailure
  Api.pushEmployee(employee, success, failure)
}

export function goToHomeScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  LoginManager.logOut()
  Store.dispatch({type: constants.APP_RESET, payload: data})
  Store.dispatch({type: constants.SCENE_NAVIGATION_HOME, payload: data})
  Actions.home()
  // @NOTE Frederic - Check Limit Unsynced Participations
  Participation.count((total) => {
    if (total > Config.sync.participationStorageLimit) {
      handleAppCriticalError(new Error('Sync Required: ' + Config.sync.participationStorageLimit + '+ Unsynced Items'))
    }
  }, ()=> {
  })
}

export function goToRegistrationScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_REGISTRATION, payload: data})
  Actions.registration()
}

export function goToIdentificationScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_IDENTIFICATION, payload: data})
  Actions.identification()
}

export function goToPurchaseScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_PURCHASE, payload: data})
  Actions.purchase()
}

export function goToPlayScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_PLAY, payload: data})
  Actions.play()
}

export function goToThanksScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_THANKS, payload: data})
  Actions.thanks()
}

export function goToEmployeeScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_EMPLOYEE, payload: data})
  Actions.employee()
}

export function goToErrorScene(message) {
  hideKeyboard()
  _hideLoadingOverlay()
  handleAppCriticalError(new Error(message))
}

export function goToGenericScene(data) {
  hideKeyboard()
  _hideLoadingOverlay()
  Store.dispatch({type: constants.SCENE_NAVIGATION_GENERIC, payload: data})
  Actions.generic()
}

export function getCampaignDataForCurrentLanguage() {
  let language = Store.getState().content.get('language')
  let prizes   = []
  Store.getState().campaign.get('prizes').forEach((prize) => {
    prizes.push({
      name      : prize.getIn(['content', language, 'name']),
      name_short: prize.getIn(['content', language, 'name_short']),
      prize_id  : prize.get('prize_id'),
      frequency : prize.get('frequency'),
      value     : prize.get('value'),
      percentage: prize.get('percentage'),
      display   : prize.get('display')
    })
  })

  return {
    backgroundImage: 'file://' + Store.getState().campaign.getIn(['style', 'back_image']),
    backStyle: {
      backgroundColor: Store.getState().campaign.getIn(['style', 'back_color'])
    },
    frontStyle: {
      color     : Store.getState().campaign.getIn(['style', 'font_color']),
      fontFamily: Store.getState().campaign.getIn(['style', 'font_name'])
    },
    frontPrimaryStyle: {
      color     : Store.getState().campaign.getIn(['style', 'primary_color']),
      fontFamily: Store.getState().campaign.getIn(['style', 'font_name'])
    },
    frontSecondaryStyle: {
      color     : Store.getState().campaign.getIn(['style', 'secondary_color']),
      fontFamily: Store.getState().campaign.getIn(['style', 'font_name'])
    },
    frontTiertiaryStyle: {
      color     : Store.getState().campaign.getIn(['style', 'tertiary_color']),
      fontFamily: Store.getState().campaign.getIn(['style', 'font_name'])
    },
    wheelStyle: {
      backgroundImage  : 'file://' + Store.getState().campaign.getIn(['style', 'wheel_back_image']),
      logoImage        : 'file://' + Store.getState().campaign.getIn(['style', 'wheel_logo_image']),
      bigPrizeBackColor: Store.getState().campaign.getIn(['style', 'big_prize_back_color']),
      bigPrizeTextColor: Store.getState().campaign.getIn(['style', 'big_prize_text_color']),
      tickColor        : Store.getState().campaign.getIn(['style', 'tick_color'])
    },
    sponsorImage: 'file://' + Store.getState().campaign.getIn(['style', 'logo_image']),
    thanksImage : 'file://' + Store.getState().campaign.getIn(['style', 'thanks_image']),
    primaryColor  : Store.getState().campaign.getIn(['style', 'primary_color']),
    secondaryColor: Store.getState().campaign.getIn(['style', 'secondary_color']),
    sponsor : Store.getState().campaign.get('sponsor'),
    shareUrl: Store.getState().campaign.get('url_campaing'),
    content: {
      name: Store.getState().campaign.getIn(['content', language, 'name']),
      announcement: Store.getState().campaign.getIn(['content', language, 'announcement']),
      share: Store.getState().campaign.getIn(['content', language, 'facebook_share']),
    },
    prizes: prizes
  }
}

export function switchLanguage() {
  Store.dispatch({type: constants.APPLICATION_LANGUAGE_CHANGED, payload: {
    language: ('fr' === Store.getState().content.get('language')) ? 'en' : 'fr',
    rotated : new Date().getTime()
  }})
}
export function hasNetworkConnection() {
  return ('online' === Store.getState().app.get('connectivity'))
}

function _showLoadingOverlay() {
  Store.dispatch({type: constants.APPLICATION_STARTED_LOADING})
}

function _hideLoadingOverlay() {
  Store.dispatch({type: constants.APPLICATION_ENDED_LOADING})
}