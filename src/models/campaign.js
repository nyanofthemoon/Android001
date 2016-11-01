'use strict'

import Config from './../config'

import { insert, erase, truncate, findOne, findAll } from './../helpers/database'

export default class Campaign {

  constructor(data) {
    this.data = Campaign.transform(data)
  }

  //@NOTE Transform API Response or Storage Data
  static transform(data) {
    let prizes = []
    if (data.prizes) {
      prizes = JSON.parse(data.prizes)
    } else {
      data.tbPrizes.forEach((prize) => {
        prizes.push({
          prize_id  : prize.prize_id,
          frequency : prize.frequency         || 0,
          value     : prize.prize_value       || null,
          percentage: prize.prize_pourcentage || null,
          display   : prize.number_of_charts  || 0,
          content: {
            fr: {
              name      : prize.name_fr       || '',
              name_short: prize.name_short_fr || ''
            },
            en: {
              name      : prize.name_en       || '',
              name_short: prize.name_short_en || ''
            }
          }
        })
      })
    }
    let content = {}
    if (data.content) {
      content = JSON.parse(data.content)
    } else {
      content = {
        fr: {
          name          : data.name_fr               || '',
          announcement  : data.annoucement_fr        || '',
          facebook_share: data.facebook_share_msg_fr || ''
        },
        en: {
          name          : data.name_en               || '',
          announcement  : data.annoucement_en        || '',
          facebook_share: data.facebook_share_msg_en || ''
        }
      }
    }
    let style = {}
    if (data.style) {
      style = JSON.parse(data.style)
    } else {
      //@NOTE whitelabel field from API is string
      let whitelabel = {}
      if (data.tbStyle.whitelabel) {
        whitelabel = JSON.parse(data.tbStyle.whitelabel)
      }
      style = {
        font_name           : data.tbStyle.api_font_name                  || Config.defaultStyle.fontName,
        font_color          : whitelabel.font_color                       || Config.defaultStyle.fontColor,
        back_color          : whitelabel.background_color                 || Config.defaultStyle.backColor,
        primary_color       : whitelabel.primary_game_color               || Config.defaultStyle.primaryColor,
        secondary_color     : whitelabel.secondary_game_color             || Config.defaultStyle.secondaryColor,
        tertiary_color      : whitelabel.color3                           || Config.defaultStyle.bigPrizeBackColor,
        logo_image          : data.tbSponsor.FullLogo_imgUrl              || Config.defaultStyle.sponsorLogoImageUrl,
        back_image          : data.tbStyle.Fullbackground_imgUrl          || Config.defaultStyle.backgroundImageUrl,
        thanks_image        : data.FullImgUrl                             || Config.defaultStyle.thanksImageUrl,
        wheel_back_image    : data.tbStyle.Fullbackground_image_wheel_url || Config.defaultStyle.wheelBackgroundImageUrl,
        wheel_logo_image    : data.tbStyle.Fullsmall_logo_url             || Config.defaultStyle.wheelLogoImageUrl,
        big_prize_back_color: whitelabel.color3                           || Config.defaultStyle.bigPrizeBackColor,
        big_prize_text_color: whitelabel.big_prize_text_color             || Config.defaultStyle.bigPrizeTextColor,
        tick_color          : whitelabel.tick_color                       || Config.defaultStyle.tickColor
      }
    }
    return {
      campaign_id : data.campaign_id,
      sponsor     : data.sponsor || data.tbSponsor.name,
      url_campaing: data.url_campaing || null,
      date_start  : new Date(data.date_start).getTime(),
      date_end    : new Date(data.date_end).getTime(),
      prizes      : prizes,
      content     : content,
      style       : style
    }
  }

  static getTableName() {
    return 'Campaign'
  }

  static getUidColumn() {
    return 'id'
  }

  //@NOTE url_campaing is mispelled but a correct representation of the API data
  static getCreateTable() {
    return 'CREATE TABLE Campaign (campaign_id INTEGER PRIMARY KEY, sponsor TEXT, date_start INTEGER, date_end INTEGER, url_campaing TEXT, content TEXT, style TEXT, prizes TEXT);'
  }

  static getOne(uid, success, error) {
    findOne(Campaign.getTableName(), Campaign.getUidColumn(), uid, success, error)
  }

  static getAll(success, error) {
    findAll(Campaign.getTableName(), (resultset) => {
      let results = resultset.rows.raw() || []
      let objects   = []
      results.forEach((result) => {
        objects.push(new Campaign(result))
      })
      success(objects)
    }, error)
  }

  static reset(success, error) {
    truncate(Campaign.getTableName(), success, error)
  }

  query() {
    return this.data
  }

  save(success, error) {
    let textData     = JSON.parse(JSON.stringify(this.data))
    textData.content = JSON.stringify(textData.content)
    textData.style   = JSON.stringify(textData.style)
    textData.prizes  = JSON.stringify(textData.prizes)
    insert(Campaign.getTableName(), textData, success, error)
  }

  remove(success, error) {
    erase(Campaign.getTableName(), Campaign.getUidColumn(), this.data[Campaign.getUidColumn()], success, error)
  }

}