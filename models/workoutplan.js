'use strict';
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
      models.Exercise.belongsToMany(User, {through: WorkoutPlan})
      models.User.belongsToMany(Exercise, {through: WorkoutPlan})
      
    }
  }
  WorkoutPlan.init({
    ExerciseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'WorkoutPlan',
  });
  return WorkoutPlan;
};