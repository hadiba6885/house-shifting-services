const bcrypt = require('bcrypt');
const UserModels = require('../models/UserModels');


const UserController = {

  getHome: async (req, res) => {
    res.render('pages/home')
  },
  getAbout: async (req, res) => {
    res.render('pages/about')
  },
  getContact: async (req, res) => {
    res.render('pages/contact')
  },
  getOffer: async (req, res) => {
    res.render('pages/offer')
  },
  getServices: async (req, res) => {
    res.render('pages/services')
  },
  // Admin Related
  getAdmin: async (req, res) => {
    res.render('pages/admin')
  },
  getService: async (req, res) => {
    res.render('pages/service')
  },
  getBooking: async (req, res) => {
    res.render('pages/booking')
  },  
  getUser: async (req, res) => {
    res.render('pages/user')
  },  
  getWorker: async (req, res) => {
    res.render('pages/worker')
  },
  getSignupForm: async (req, res) => {
    res.render('pages/signup')
  },
  getLoginForm: async (req, res) => {
    res.render('pages/login')
  },


  signupData: async (req, res) => {
    try {
      const {
        firstName, lastName, email, phone, house, road, division, upazila, zila, role, pass,
      } = req.body;
      const hash = await bcrypt.hash(pass, 10);
      // console.log(req.body.email)
      const signup = await UserModels.signup(firstName, lastName, email, phone, house, road,  division, upazila, zila, role, hash);

      if (signup.errno) {
        res.send('Something went wrong')
      } else {
        res.redirect('/login')
        // res.send('Signup successfull')
      }
    } catch (e) {
      console.log(e);
      res.send('Wrong')
    }
  },

  getloginForm: async (req, res) => {
    res.render('pages/login', { title: 'Express', session: req.session })
  },
  loginData: async (req, res) => {
    try {

      const {
        email, role, pass,
      } = req.body;

      if (email && pass && role) {
        const login = await UserModels.login(email);
        if (login.length > 0) {
          for (let i = 0; i < login.length; i++) {
            const validPass = await bcrypt.compare(pass, login[i].pass);
            if (validPass && login[i].role == role) {
              req.session.u_id = login[i].u_id;
              req.session.first_name = login[i].first_name;
              req.session.last_name = login[i].last_name;
              req.session.role = login[i].role;
              console.log("test", login)
              res.redirect('/login');
            }
            else {
              res.send('Incorrect Password');
            }
          }
        }
        else {
          res.send('Incorrect Email Address');
        }
        res.end();
      }
      else {
        res.send('Please enter your email, password and role, If you have no account please sign up.')
        res.end();
      }
    } catch (e) {
      console.log(e);
      res.send('Wrong')
    }
  },

  userData: async (req, res) => {
    res.render('pages/home')
  },


  getlogout: (req, res) => {
    req.session.destroy();
    res.redirect('/')
  },

}
module.exports = UserController
