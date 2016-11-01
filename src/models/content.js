'use strict'

import { insert, erase, truncate, findOne, findAll } from './../helpers/database'

export default class Content {

  constructor(data) {
    this.data = Content.transform(data)
  }

  //@NOTE Transform API Response or Storage Data
  static transform(data) {
    return {
      label: data.label,
      fr   : data.fr,
      en   : data.en
    }
  }

  static getTableName() {
    return 'Content'
  }

  static getUidColumn() {
    return 'label'
  }

  static getCreateTable() {
    return 'CREATE TABLE Content (label TEXT PRIMARY KEY, fr TEXT, en TEXT);'
  }

  static getOne(uid, success, error) {
    findAll(Content.getTableName(), Content.getUidColumn(), uid, success, error)
  }

  static getAll(success, error) {
    findAll(Content.getTableName(), (resultset) => {
      let results = resultset.rows.raw() || []
      let objects   = []
      results.forEach((result) => {
        objects.push(new Content(result))
      })
      success(objects)
    }, error)
  }

  static reset(success, error) {
    truncate(Content.getTableName(), success, error)
  }

  query() {
    return this.data
  }

  save(success, error) {
    insert(Content.getTableName(), this.data, success, error)
  }

  remove(success, error) {
    erase(Content.getTableName(), Content.getUidColumn(), this.data[Content.getUidColumn()], success, error)
  }

}