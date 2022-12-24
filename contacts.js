const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, "db/contacts.json")

async function readDb() {
  const db = await fs.readFile(contactsPath);
  const contacts = JSON.parse(db);
  return contacts;
}

async function writeDB(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}


async function listContacts() {
    try {
       return await readDb()
    } catch (err) {
        console.log(err)
    }
    
}

async function getContactById(contactId) {
   try {
        const contacts = await readDb()
       return (contacts.find(contact => contact.id === contactId))
    } catch (err) {
        console.log(err)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await readDb()
        const newContacts = contacts.filter(contact => contact.id !== contactId)
        await writeDB(newContacts)
    } catch (err) {
        console.log(err)
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await readDb()
        contacts.push({
            "id": `${contacts.length + 1}`,
            name,
            email,
            phone    
        })
        await writeDB(contacts)
    } catch (err) {
        console.log(err)
    }
}




module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}