// https://github.com/andpor/react-native-sqlite-storage
// https://github.com/litehelpers/Cordova-sqlite-storage

'use strict'

let SQLite = require('react-native-sqlite-storage')

import Config from './../config'
import { handleAppDbConnectionSuccess, handleAppDbConnectionFailure } from './../actions'

import Campaign from './../models/campaign'
import Employee from './../models/employee'
import Content from './../models/content'
import Participation from './../models/participation'
import Merchant from './../models/merchant'

if (Config.environment.isDevelopment()) {
  SQLite.DEBUG(true)
}

let db

export function establishDatabaseConnection() {
  db = SQLite.openDatabase({name: Config.db.name}, handleAppDbConnectionSuccess, handleAppDbConnectionFailure)
}

export function databaseSchemaExists(callback) {
  db.executeSql('SELECT * FROM Installation LIMIT 1;', [],
    (success) => { callback(true)  },
    (error)   => { callback(false) }
  )
}

export function merchantDataExists(callback) {
  db.executeSql('SELECT * FROM ' + Merchant.getTableName() + ' LIMIT 1;', [],
    (success) => {
      let rows     = success.rows.raw()
      let merchant = null
      rows.map((row) => {
        merchant = row
      })
      callback(merchant)
    },
    (error) => { callback(null) }
  )
}

export function resetDatabaseSchema(success, error) {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS ' + Content.getTableName()  + ';')
    tx.executeSql(Content.getCreateTable())
    tx.executeSql('DROP TABLE IF EXISTS ' + Merchant.getTableName() + ';')
    tx.executeSql(Merchant.getCreateTable())
    tx.executeSql('DROP TABLE IF EXISTS ' + Employee.getTableName() + ';')
    tx.executeSql(Employee.getCreateTable())
    tx.executeSql('DROP TABLE IF EXISTS ' + Campaign.getTableName() + ';')
    tx.executeSql(Campaign.getCreateTable())
    tx.executeSql('DROP TABLE IF EXISTS ' + Participation.getTableName()  + ';')
    tx.executeSql(Participation.getCreateTable())
    tx.executeSql('DROP TABLE IF EXISTS Installation;')
    tx.executeSql('CREATE TABLE Installation (id INTEGER PRIMARY KEY);')
  }, error, success)
}

export function insert(table, data, success, error) {
  let keys         = [];
  let placeholders = [];
  let values       = [];
  for (var key in data) {
    keys.push(key);
    placeholders.push('?');
    values.push(data[key])
  }
  db.executeSql('INSERT INTO ' + table + ' (' + keys.join(',') + ') VALUES (' + placeholders.join(',') + ');', values, success, error)
}

export function findCount(table, success, error) {
  db.executeSql('SELECT COUNT(*) AS total FROM ' + table + ';', null, success, error)
}

export function findOne(table, uidKey, uidValue, success, error) {
  db.executeSql('SELECT * FROM ' + table + ' WHERE ' + uidKey + '=?;', [uidValue], success, error)
}

export function findSome(table, limit, success, error) {
  db.executeSql('SELECT * FROM ' + table + ' WHERE 1=1 LIMIT ' + limit + ';', null, success, error)
}

export function findAll(table, success, error) {
  db.executeSql('SELECT * FROM ' + table + ' WHERE 1=1;', null, success, error)
}

export function erase(table, uidKey, uidValue, success, error) {
  db.executeSql('DELETE FROM ' + table + ' WHERE ' + uidKey + '=?;', [uidValue], success, error)
}

export function truncate(table, success, error) {
  db.executeSql('DELETE FROM ' + table + ';', null, success, error)
}