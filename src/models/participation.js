'use strict'

import UUIDGenerator from 'react-native-uuid-generator'
import DeviceInfo from 'react-native-device-info'

import { insert, erase, truncate, findSome, findAll, findCount } from './../helpers/database'

export default class Participation {

  constructor(campaign, customer) {
    if (campaign && customer) {
      this.data = {
        langue               : ('fr' === customer.getIn(['registration', 'language'])) ? 1 : 2, // fr=1, en=2
        gender               : null,
        date_birth_ui        : null,
        date_participation_ui: new Date().getTime(),
        employe_id           : customer.getIn(['employee', 'employee_id']),
        hardware_id          : DeviceInfo.getUniqueID(),
        customer_first_name  : customer.getIn(['registration', 'firstName']),
        customer_last_name   : customer.getIn(['registration', 'lastName']),
        email                : customer.getIn(['registration', 'email']),
        phone                : customer.getIn(['registration', 'phone']),
        prize_id             : customer.getIn(['prize', 'prize_id']),
        campaign_id          : campaign.get('campaign_id'),
        facebook_id          : customer.getIn(['registration', 'facebookId']),
        fb_agerange          : customer.getIn(['registration', 'facebookAgeRange']),
        tbProducts           : customer.get('purchase').toJSON()
      }
      let gender = customer.getIn(['registration', 'gender'])
      if (gender) {
        this.data.gender = ('male' === gender) ? 1 : 2 // male=1, female=2
      }
      let birthday = customer.getIn(['registration', 'birthday'])
      if (birthday) {
        this.data.date_birth_ui = new Date(birthday).getTime()
      }
    } else {
      this.data = Participation.transform(campaign)
    }
  }

  //@NOTE Transform From Storage Data
  static transform(data) {
    data.tbProducts = JSON.parse(data.tbProducts)
    return data
  }

  static getTableName() {
    return 'Participation'
  }

  static getUidColumn() {
    return 'internal_id'
  }

  static getCreateTable() {
    return 'CREATE TABLE Participation (internal_id TEXT PRIMARY KEY, langue INTEGER, gender INTEGER, date_participation_ui INTEGER, date_birth_ui INTEGER, employe_id INTEGER, hardware_id TEXT, latitude REAL, longitude REAL, customer_first_name TEXT, customer_last_name TEXT, email TEXT, phone TEXT, prize_id INTEGER, campaign_id INTEGER, facebook_id TEXT, fb_agerange TEXT, tbProducts TEXT);'
  }

  static getSome(limit, success, error) {
    findSome(Participation.getTableName(), limit, (resultset) => {
      let results = resultset.rows.raw() || []
      let objects   = []
      results.forEach((result) => {
        objects.push(new Participation(result))
      })
      success(objects)
    }, error)
  }

  static getAll(success, error) {
    findAll(Participation.getTableName(), (resultset) => {
      let results = resultset.rows.raw() || []
      let objects   = []
      results.forEach((result) => {
        objects.push(new Participation(result))
      })
      success(objects)
    }, error)
  }

  static count(success, error) {
    findCount(Participation.getTableName(), (resultset) => {
      let results = resultset.rows.raw()
      success(results[0].total)
    }, error)
  }

  static reset(success, error) {
    truncate(Participation.getTableName(), success, error)
  }

  setUUID(success) {
    let that = this
    UUIDGenerator.getRandomUUID((uuid) => {
      that.data.internal_id = uuid
      success()
    })
  }

  setCoordinates(success) {
    try {
      let that = this
      navigator.geolocation.getCurrentPosition(function(geo) {
        that.data.latitude  = geo.coords.latitude.toFixed(6)
        that.data.longitude = geo.coords.longitude.toFixed(6)
        success()
      })
    } catch (e) {
      success()
    }
  }

  query() {
    return this.data
  }

  save(success, error) {
    this.data.tbProducts = JSON.stringify(this.data.tbProducts)
    insert(Participation.getTableName(), this.data, success, error)
  }

  remove(success, error) {
    erase(Participation.getTableName(), Participation.getUidColumn(), this.data[Participation.getUidColumn()], success, error)
  }

}