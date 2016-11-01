'use strict'

import RNFetchBlob from 'react-native-fetch-blob'

import Config from './../config'

import { queryApiContent, queryApiMerchantByPin, queryApiEmployeesByMerchant, queryApiActiveCampaignByMerchant, submitApiParticipation } from './../actions'

import Content from './../models/content'
import Merchant from './../models/merchant'
import Employee from './../models/employee'
import Campaign from './../models/campaign'
import Participation from './../models/participation'

export function content() {
  return new Promise(function(resolve, reject) {
    try {
      queryApiContent(
        (type, response) => {
          Content.reset(() => {
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNC] Deleted Content')
            }
            let contents = []
            response.payload.forEach((data) => {
              let content = new Content(data)
              contents.push(content.data)
              content.save()
            })
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNC] Synced Content', contents)
            }
            resolve(contents)
          }, () => { reject(new Error('Data Storage Content Cleanup')) })
        },
        (error) => { reject(error) }
      )
    } catch (err) {
      reject(err)
    }
  })
}

export function merchant(pin) {
  return new Promise((resolve, reject) => {
    try {
      let data = {
        merchant : {},
        campaign : {},
        employees: []
      }
      _syncMerchant(pin).then((merchant) => {
        data.merchant = merchant
          employees(pin).then((employees) => {
          data.employees = employees
          _syncCampaign(pin).then((campaign) => {
            data.campaign = campaign
            resolve(data)
          })
          .catch((err) => { reject(err) })
        })
        .catch((err) => { reject(err) })
      })
      .catch((err) => { reject(err) })
    } catch (err) {
      reject(err)
    }
  })
}

export function participations() {
  return new Promise((resolve, reject) => {
    try {
      Participation.getSome(Config.sync.participationBulkQuantity,
        (participations) => {
          participations.forEach((participation) => {
            // @NOTE Pascal : Required by API
            participation.data.date_participation = '1969-01-11T03:04:47'
            participation.data.date_birth         = '1969-01-11T03:04:47'
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNCING] Participation', participation.data)
            }
            submitApiParticipation(participation.data, (type, response)=>{
              if ('success' === response.payload.type) {
                participation.remove(()=>{ console.log('removed!') }, (error) => { console.log(error)} )
              }
            }, (error) => { console.log('[SYNC] Participation', error) })
          })
          resolve()
        },
        (error) => { reject(error) }
      )
    } catch (err) {
      reject(err)
    }
  })
}

function _syncMerchant(pin) {
  return new Promise((resolve, reject) => {
    try {
      queryApiMerchantByPin(pin,
        (type, response) => {
          Merchant.reset(() => {
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNC] Deleted Merchant')
            }
            if (Object.keys(response.payload).length > 0) {
              let merchant = new Merchant(response.payload)
              merchant.save()
              if (true === Config.environment.isDevelopment()) {
                console.log('[SYNC] Synced Merchant', merchant)
              }
              resolve(merchant.data)
            } else {
              if (true === Config.environment.isDevelopment()) {
                console.log('[SYNC] Synced No Merchant')
              }
              reject(new Error('Merchant PIN Not Found'))
            }
          }, () => { reject(new Error('Data Storage Merchant Cleanup')) } )
        }, (error) => { reject(error) }
      )
    } catch (err) {
      reject(err)
    }
  })
}

export function employees(pin) {
  return new Promise((resolve, reject) => {
    try {
      queryApiEmployeesByMerchant(pin,
        (type, response) => {
          Employee.reset(() => {
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNC] Deleted Employees')
            }
            let employees = []
            if (response.payload.length > 0) {
              response.payload.forEach((data) => {
                let employee = new Employee(data)
                employees.push(employee.data)
                employee.save()
              })
              if (true === Config.environment.isDevelopment()) {
                console.log('[SYNC] Synced Employees', employees)
              }
            } else {
              if (true === Config.environment.isDevelopment()) {
                console.log('[SYNC] Synced No Employees')
              }
            }
            resolve(employees)
          }, () => { reject(new Error('Data Storage Employees Cleanup')) } )
        },
        (error) => {
          reject(error)
        }
      )
    } catch (err) {
      reject(err)
    }
  })
}

function _syncCampaign(pin) {
  return new Promise((resolve, reject) => {
    try {
      queryApiActiveCampaignByMerchant(pin,
        (type, response) => {
          //@TODO Delete Downloaded Campaign Images
          Campaign.reset(() => {
            if (true === Config.environment.isDevelopment()) {
              console.log('[SYNC] Deleted Active Campaign')
            }
            let campaign = new Campaign(response.payload)
            if (Object.keys(response.payload).length > 0) {
              RNFetchBlob.config({fileCache: true, appendExt:'png'}).fetch('GET', campaign.data.style.logo_image, {}).then((logo) => {
                campaign.data.style.logo_image = logo.path()
                RNFetchBlob.config({fileCache: true, appendExt:'png'}).fetch('GET', campaign.data.style.back_image, {}).then((back) => {
                  campaign.data.style.back_image = back.path()
                  RNFetchBlob.config({fileCache: true, appendExt:'png'}).fetch('GET', campaign.data.style.thanks_image, {}).then((thanks) => {
                    campaign.data.style.thanks_image = thanks.path()
                    RNFetchBlob.config({fileCache: true, appendExt:'png'}).fetch('GET', campaign.data.style.wheel_back_image, {}).then((wheelBack) => {
                      campaign.data.style.wheel_back_image = wheelBack.path()
                      RNFetchBlob.config({fileCache: true, appendExt:'png'}).fetch('GET', campaign.data.style.wheel_logo_image, {}).then((wheelLogo) => {
                        campaign.data.style.wheel_logo_image = wheelLogo.path()
                        campaign.save()
                        if (true === Config.environment.isDevelopment()) {
                          console.log('[SYNC] Synced Active Campaign', campaign.data)
                        }
                        resolve(campaign.data)
                       })
                       .catch((err) => {
                         reject(new Error('Download Campaign Wheel Logo'))
                       })
                    })
                    .catch((err) => {
                      reject(new Error('Download Campaign Wheel Background'))
                    })
                  })
                  .catch((err) => {
                    reject(new Error('Download Campaign Thank You'))
                  })
                })
                .catch((err) => {
                  reject(new Error('Download Campaign Background'))
                })
              })
              .catch((err) => {
                reject(new Error('Download Campaign Logo'))
              })
            } else {
              console.log('[SYNC] Synced No Active Campaign')
              resolve({})
            }
          }, () => { reject(new Error('Data Storage Campaigns Cleanup')) } )
        },
        (error) => { reject(error) }
      )
    } catch (err) {
      reject(err)
    }
  })
}