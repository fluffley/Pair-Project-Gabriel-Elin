'use strict';
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = await fs.readFile('./data/exercises.json', 'utf-8')
   const dataJSON = JSON.parse(data)
   const dataReturn = dataJSON.map(el => {
    el.createdAt = new Date ()
    el.updatedAt = new Date ()


    return el
   })
   await queryInterface.bulkInsert('Exercises', dataReturn, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Exercises', null, {})
  }
};
