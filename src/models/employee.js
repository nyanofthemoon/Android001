'use strict'

import UUIDGenerator from 'react-native-uuid-generator'

import { insert, erase, truncate, findOne, findAll } from './../helpers/database'

export default class Employee {

  constructor(data) {
    this.data = Employee.transform(data)
  }

  //@NOTE Transform API Response or Storage Data
  static transform(data) {
    return {
      pin        : data.pin         || data.employee_pin        || null,
      internal_id: data.internal_id || null,
      employee_id: data.employee_id || null,
      first_name : data.first_name  || data.employee_first_name || null,
      last_name  : data.last_name   || data.employee_last_name  || null,
      is_valid   : (true == data.is_valid) ? 1 : 0
    }
  }

  static getTableName() {
    return 'Employee'
  }

  static getUidColumn() {
    return 'id'
  }

  static getCreateTable() {
    return 'CREATE TABLE Employee (pin TEXT PRIMARY KEY, internal_id TEXT, employee_id INTEGER, first_name TEXT, last_name TEXT, is_valid INTEGER NOT NULL);'
  }

  static getOne(uid, success, error) {
    findOne(Employee.getTableName(), Employee.getUidColumn(), uid, success, error)
  }

  static getAll(success, error) {
    findAll(Employee.getTableName(), (resultset) => {
      let results = resultset.rows.raw() || []
      let objects   = []
      results.forEach((result) => {
        objects.push(new Employee(result))
      })
      success(objects)
    }, error)
  }

  static reset(success, error) {
    truncate(Employee.getTableName(), success, error)
  }

  setUUID(success) {
    UUIDGenerator.getRandomUUID((uuid) => {
      this.data.internal_id = uuid
      success()
    })
  }

  isActive() {
    return (this.data.is_valid === 1)
  }

  query() {
    return this.data
  }

  save(success, error) {
    insert(Employee.getTableName(), this.data, success, error)
  }

  remove(success, error) {
    erase(Employee.getTableName(), Employee.getUidColumn(), this.data[Employee.getUidColumn()], success, error)
  }

}