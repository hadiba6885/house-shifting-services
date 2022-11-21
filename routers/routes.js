const router = require('express').Router();
const UserController = require('../controllers/UserController');


router.get('/signup', UserController.getSignupForm)


router.post('/add-user', UserController.signupData)
router.get('/', UserController.getloginForm)

router.get('/home', UserController.getHome)
router.get('/about', UserController.getAbout)
router.get('/contact', UserController.getContact)
router.get('/offer', UserController.getOffer)
router.get('/services', UserController.getServices)

router.post('/login', UserController.loginData)
router.get('/logout', UserController.getlogout)
router.get('/admin', UserController.getAdmin)
router.get('/service', UserController.getService)



module.exports = router;
