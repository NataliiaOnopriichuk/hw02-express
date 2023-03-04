const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require('joi')
const { RequestError } = require('../../helpers')

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getById(contactId)
    if (!result) {
      throw RequestError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw RequestError(400, "Missing required name field")
    }
    const result = await contacts.addContact(req.body)
    return res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
