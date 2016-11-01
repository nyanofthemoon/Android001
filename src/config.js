'use strict'

let config = {

  application: {
    version       : '1.1.0',
    app_version_id: '1'      //@NOTE API return 301 Moved Permanently if device needs to update application
  },

  // @NOTE This is for production: there are no available development or staging API
  api: {
    protocol  : 'https',
    domain    : 'app.app2buzz.com',
    secret_key: 'AA3E925BF8A89E404B7EB83A62E049B71264AC08A20E2BB69036DB82ABB36AC0', //@NOTE Shared secret between API and application
    public_key: '54E55A55BF40AFD91D7C36977CFA27C19292A2CE97A3BE6C54BAC8A30F181590', //@NOTE Shared secret between API and application
    path      : '/Api',
    version   : '/1',
    port      : '',
    getBaseUrl: function() {
      return config.api.protocol + '://' + config.api.domain + config.api.port
    },
    action: {
      getPing          : '',
      getContent       : '/GetContent',
      getMerchant      : '/GetMerchant',       // by Merchant PIN (tbMerchants.merchant_api_pin)
      getEmployees     : '/GetEmployes',       // by Merchant PIN (tbMerchants.merchant_api_pin)
      getCampaigns     : '/GetCampaign',       // by Merchant PIN (tbMerchants.merchant_api_pin)
      postParticipation: '/PushParticipation', // Create Participation
      postEmployee     : '/PushEmploye'        // Create Employee
    }
  },

  db: {
    name: 'spinandwin',
    path: ''
  },

  environment: {
    isDevelopment: function() {
      return __DEV__
    }
  },

  languageInterval: (12 * (1000)),                  // @NOTE Switch Language in Home Scene Every X Seconds,
  homeThemeChance : 7,                              // @NOTE On Home Languague Switch, Chances to play theme song to attract attention

  sync: {
    participation            : (3 * (60*1000)),     // @NOTE Bulk Async Every X Minutes
    participationBulkQuantity: 50,                  // @NOTE 250 API Calls Every X Minutes
    participationStorageLimit: 100,                 // @NOTE Fata Error When Over X Unsynced Participations
    merchant                 : (72 * (60*60*1000)), // @NOTE Async Every X Hours
    ignore                   : false                // @NOTE Skip re-sync for faster dev
  },

  inactivity: {
    timeout      : (3 * (60*1000)),                         // @NOTE Return To Home When Inactive For X Minutes
    excludeScenes: ['install', 'employee', 'error', 'home'] // @NOTE Nothing happens for those scenes
  },

  privacyPolicy: {
    fr: 'http://m.app2buzz.com/conditions-utilisation-spin-win',
    en: 'http://m.app2buzz.com/terms-service-spin-win'
  },

  defaultStyle: {
    fontName               : 'Roboto',
    fontColor              : '#000000',
    backColor              : '#FFFFFF',
    primaryColor           : '#AAAAAA',
    secondaryColor         : '#CCCCCC',
    sponsorLogoImageUrl    : '',
    backgroundImageUrl     : '',
    thanksImageUrl         : '',
    wheelBackgroundImageUrl: '',
    wheelLogoImageUrl      : '',
    bigPrizeBackColor      : '#F85A29',
    bigPrizeTextColor      : '#FFFFFF',
    tickColor              : '#F85A29'
  },

  wheel: {
    parts      : 16,
    radius     : 300,
    threshold  : 0.5,
    minRotation: 4,
    maxRotation: 6
  }

}

// Development Environment Configurations
if (true === config.environment.isDevelopment()) {
  config.db.name            = config.db.name + '_dev2'
  config.sync.ignore        = true
  config.sync.participation = 1000000
}

module.exports = config