'use strict'

import { insert, erase, truncate } from './../helpers/database'

export default class Merchant {

  constructor(data) {
    this.data = Merchant.transform(data)
  }

  //@NOTE Transform API Response or Storage Data
  static transform(data) {
    return {
      pin        : data.pin         || data.merchant_api_pin || null,
      merchant_id: data.merchant_id || null,
      name       : data.name        || null,
      address    : data.address     || null,
      phone      : data.phone       || null
    }
  }

  static getTableName() {
    return 'Merchant'
  }

  static getUidColumn() {
    return 'pin'
  }

  static getCreateTable() {
    return 'CREATE TABLE Merchant (pin TEXT PRIMARY KEY, merchant_id INTEGER, name TEXT, address TEXT, phone TEXT);'
  }

  static reset(success, error) {
    truncate(Merchant.getTableName(), success, error)
  }

  query() {
    return this.data
  }

  save(success, error) {
    insert(Merchant.getTableName(), this.data, success, error)
  }

  remove(success, error) {
    erase(Merchant.getTableName(), Merchant.getUidColumn(), this.data[Merchant.getUidColumn()], success, error)
  }

}