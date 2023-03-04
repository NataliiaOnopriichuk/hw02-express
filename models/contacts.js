const fs = require('fs/promises')
const path = require("path")

const contactsPath = path.join(__dirname, "contacts.json")

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8")
  return JSON.parse(contacts)
}

const getById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(el => el.id === contactId)
  return contact || null
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = {
    id: String(contacts.length + 1), name, email, phone,
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const removeContact = async (contactId) => { }



const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
