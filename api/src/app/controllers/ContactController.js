const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll({ orderBy });

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, categoryId } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: 'Missing fields' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'Contact already exists' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id: categoryId,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: 'Missing fields' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists && contactExists.id !== id) {
      return response.status(400).json({ error: 'Contact already exists' });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
