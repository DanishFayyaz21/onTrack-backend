import express from 'express'
import UserContoller from '../app/http/controllers/UserController.js'
import auth from '../app/http/middlewares/auth.js'
import Upload from '../app/http/middlewares/Storages.js'

const router = express.Router()

// first route in app


router.post('/login', UserContoller.loginUser)
router.post('/register', Upload.single('avatar'), UserContoller.signup)
router.get('/my-profile', auth, UserContoller.myProfile)
router.delete('/delete-my-account', auth, UserContoller.deleteMyAccount)
router.put('/edit-user', [auth, Upload.single('avatar')], UserContoller.editUser)


router.get('/get-user-by-id', auth, UserContoller.getUserByID)
router.get('/get-all-users', auth, UserContoller.getAllUsers)
router.delete('/delete-user', auth, UserContoller.deleteUserById)
router.post('/add-user', [auth, Upload.single('avatar')], UserContoller.addUser)


export default router