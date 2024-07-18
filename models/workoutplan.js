'use strict';
const dayjs = require('dayjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutPlan.belongsTo(models.User, {foreignKey: 'UserId'})
      WorkoutPlan.belongsToMany(models.Exercise, {through: 'WorkoutPlanExercises', foreignKey: 'WorkoutPlanId'})
    }
    get durationInDays () {
      const start = dayjs(this.startDate)
      const end = dayjs(this.endDate)
      return end.diff(start, 'day') //ini biar dapet kalkulasi in between
    }
  }
  WorkoutPlan.init({
    UserId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'WorkoutPlan',
  });
  return WorkoutPlan;
};