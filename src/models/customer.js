'use strict'

export default class Customer {

  constructor(data) {
    this.data = Customer.transform(data)
  }

  //@NOTE Transform Form Data
  static transform(data) {
    return {
      firstName : data.firstName,
      lastName  : data.lastName,
      email     : data.email,
      phone     : data.phone,
      gender    : data.gender,
      birthday  : data.birthday,
      language  : data.language,
      emailPromo: data.emailPromo
    }
  }

}