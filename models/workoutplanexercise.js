'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutPlanExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutPlanExercise.belongsTo(models.WorkoutPlan, { foreignKey: 'WorkoutPlanId' });
      WorkoutPlanExercise.belongsTo(models.Exercise, { foreignKey: 'ExerciseId' });
    }
  }
  WorkoutPlanExercise.init({
    WorkoutPlanId: DataTypes.INTEGER,
    ExerciseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WorkoutPlanExercise',
  });
  return WorkoutPlanExercise;
};