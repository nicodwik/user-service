'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('users', [{
      name: 'Nico',
      email: 'nicodwika@gmail.com',
      role: 'admin',
      profession: 'perogrammer',
      password: await bcrypt.hash('initehpassword', 10),
      created_at: new Date(),
      updated_at: new Date()
     },

     {
      name: 'student 1',
      email: 'student@gmail.com',
      role: 'student',
      profession: 'perogrammer',
      password: await bcrypt.hash('initehpassword', 10),
      created_at: new Date(),
      updated_at: new Date()
     }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
