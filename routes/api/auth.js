const express = require('express')
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const authController = require('../../controllers/authController')
const { validateBody } = require('../../middlewares/validateBody');
const { registerSchema, loginSchema, verifySchema } = require('../../schemas/auth');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/upload');


const router = express.Router()

router.post('/register', validateBody(registerSchema), ctrlWrapper(authController.register))
router.post('/login', validateBody(loginSchema), ctrlWrapper(authController.login))
router.get('/logout', auth, ctrlWrapper(authController.logout))
router.get('/current', auth, ctrlWrapper(authController.current))
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(authController.avatars));
router.get('/verify/:verificationToken', ctrlWrapper(authController.verifyEmail))
router.post('/verify', validateBody(verifySchema), ctrlWrapper(authController.secondaryVerify))

module.exports = router