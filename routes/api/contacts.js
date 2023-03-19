const express = require('express')
const { ctrlWrapper } = require("../../helpers")
const contactsController = require('../../controllers/contactsController')
const { auth } = require('../../middlewares/auth')

const router = express.Router()

router.get('/', auth, ctrlWrapper(contactsController.getAll))

router.get('/:contactId', ctrlWrapper(contactsController.getById))

router.post('/', auth, ctrlWrapper(contactsController.addContact))

router.delete('/:contactId', ctrlWrapper(contactsController.deleteById))

router.put('/:contactId', ctrlWrapper(contactsController.updateById))

router.patch('/:contactId/favorite', ctrlWrapper(contactsController.updateFavoriteById))

module.exports = router

