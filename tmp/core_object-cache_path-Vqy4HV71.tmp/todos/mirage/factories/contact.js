define('todos/mirage/factories/contact', ['exports', 'ember-cli-mirage'], function (exports, Mirage) {

  'use strict';

  /*
    This is an example factory definition.

    Create more files in this directory to define additional factories.
  */
  exports['default'] = Mirage['default'].Factory.extend({
    // name: 'Pete',                         // strings
    // age: 20,                              // numbers
    // tall: true,                           // booleans

    // email: function(i) {                  // and functions
    //   return 'person' + i + '@test.com';
    // },

    // firstName: faker.name.firstName,       // using faker
    // lastName: faker.name.firstName,
    // zipCode: faker.address.zipCode
  });

});