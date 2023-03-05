const express = require('express')
const { ctrlWrapper } = require("../../helpers")
const contactsController = require('../../controllers/contactsController')

const router = express.Router()

router.get('/', ctrlWrapper(contactsController.getAll))

router.get('/:contactId', ctrlWrapper(contactsController.getById))

router.post('/', ctrlWrapper(contactsController.addContact))

router.delete('/:contactId', ctrlWrapper(contactsController.deleteById))

router.put('/:contactId', ctrlWrapper(contactsController.updateById))

module.exports = router





// const express = require('express')
// const contacts = require('../../models/contacts')
// const Joi = require('joi')
// const { RequestError } = require('../../helpers')

// const router = express.Router()

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts()
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params
//     const result = await contacts.getById(contactId)
//     if (!result) {
//       throw RequestError(404, 'Not found')
//     }
//     res.json(result)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body)
//     if (error) {
//       throw RequestError(400, "Missing required name field")
//     }
//     const result = await contacts.addContact(req.body)
//     return res.status(201).json(result)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params
//     const result = await contacts.removeContact(contactId)
//     if (!result) {
//       throw RequestError(404, 'Not found')
//     }
//     res.json({ message: "Contact deleted" })
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body)
//     if (error) {
//       throw RequestError(400, "Missing fields")
//     }
//     const { contactId } = req.params
//     const result = await contacts.updateContact(contactId, { ...req.body })
//     if (!result) {
//       throw RequestError(404, 'Not found')
//     }
//     res.json(result)
//   } catch (error) {
//     next(error)
//   }
// })

// module.exports = router
