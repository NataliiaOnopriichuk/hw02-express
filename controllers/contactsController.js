const Contact = require('../models/contact')
const { addSchema, updateFavoriteSchema } = require('../schemas/contacts')
const { RequestError } = require('../helpers')

const getAll = async (req, res, next) => {
    const { id: owner } = req.user
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-__v", { skip, limit: Number(limit) }).populate(
        "owner",
        "email subscription"
    )
    res.json(result)
}

const getById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const { id: owner } = req.user
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw RequestError(400, "Missing required name field")
    }
    const result = await Contact.create({ ...req.body, owner })
    return res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json({ message: "Contact deleted" })
}

const updateById = async (req, res, next) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw RequestError(400, "Missing fields")
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

const updateFavoriteById = async (req, res, next) => {
    const { error } = updateFavoriteSchema.validate(req.body)
    if (error) {
        throw RequestError(400, "Missing field favorite")
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
        throw RequestError(404, 'Not found')
    }
    res.json(result)
}

module.exports = { getAll, getById, addContact, updateById, deleteById, updateFavoriteById }