const { User, Profile, Exercise, WorkoutPlan, WorkoutPlanExercise } = require('../models/index')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const Helper = require('../helper/helper')


class Controller {

  static async home(req, res) {
    try {
      res.render('index.ejs')
    } catch (error) {
      res.send(error)
    }
  }

  static async register(req, res) {
    try {
      res.render('joinPages.ejs')
    } catch (error) {
      res.send(error)
    }
  }

static async programExc (req,res) {
  try {
    const {search} = req.query
      const option = {}
      if (search) {
        option.where = {
          exerciseName: {
            [Op.iLike]: `%${search}%`,
          }
        }
      }
    const gyms = await Exercise.findAll(option)
      
    res.render('programExcersie', {gyms})
  } catch (error) {
    res.send(error)
  }
}

  static async registered(req, res) {
    try {
      const { userName, email, password, role } = req.body
      const encryptedPass = bcrypt.hashSync(password, 10)
      const userRole = Helper.defaultRole(role)
      const verify = await User.create({
        userName: userName,
        email: email,
        password: encryptedPass,
        role: userRole
      })
      // console.log(verify);
      res.redirect('/login',)
    } catch (error) {
      res.send(error)
    }
  }
  static async login(req, res) {
    try {
      res.render('loginUser.ejs')
    } catch (error) {
      res.send(error)
    }
  }
  static async loggedIn(req, res) {
    try {
      const { userName, password } = req.body
      const verify = await User.findOne({
        where: {
          userName: userName
        }
      })
      if (verify && await bcrypt.compare(password, verify.password)) {
        // console.log(verify);
        req.session.userId = verify.id

        res.redirect('/programExcersie')
      }else {
        res.send(error,'Your username/password does not match')
      }
    } catch (error) {
      res.send(error)
    }
  }

  static async loginAdmin(req, res) {
    try {
      res.render('loginAdmin.ejs')
    } catch (error) {
      res.send(error)
    }
  }
  static async loggedAdmin(req, res) {
    try {
      const { userName, password } = req.body
      const verify = await User.findOne({
        where: {
          userName: userName
        }
      })
      if (!verify || verify.password !== password) {
        res.send(error)
      }
      // console.log(verify);
      req.session.userId = verify.id

      res.redirect('/admin/page')

    } catch (error) {
      res.send(error)
    }
  }
  static async adminPage(req, res) {
    try {
      const data = await WorkoutPlan.findAll({
        include: {
          model: User,
          where: {
            role: {
              [Op.not]: 'admin'
            }
          }
        }
      });
      console.log(data);

      res.render('adminPage.ejs', { data })
    } catch (error) {
      res.send(error)
    }
  }
  static async addPlan(req, res) {
    try {
      const data = await User.findAll({
        where: {
          role: {
            [Op.not]: 'admin'
          }
        }
      })
      console.log(data);
      res.render('formAddPlan.ejs', {users: data})
    } catch (error) {
      res.send(error)
    }
  }
  static async addedPlan(req, res) {
    try {
      const { UserId, startDate, endDate } = req.body
      const newPlan = await WorkoutPlan.create({
        UserId,
        startDate,
        endDate
      })
      // const newExercise
      res.redirect('/admin/page')
    } catch (error) {
      res.send(error)
    }
  }
  static async logout(req, res) {
    try {
      req.session.destroy
      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
  static async deletePlan(req, res) {
    try {
      const { id } = req.params
      const deletePlan = await WorkoutPlan.destroy({
        where: {
          id
        }
      })
      console.log(deletePlan);
      res.redirect('/admin/page')
    } catch (error) {
      res.send(error)
    }
  }


}

module.exports = Controller