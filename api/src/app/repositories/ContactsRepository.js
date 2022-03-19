const db = require('../../database');

class ContactsRepository {
  async findAll({ orderBy = 'ASC' }) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(`SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}`);
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `,
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(
      `
      SELECT * FROM contacts
      WHERE email = $1
    `,
      [email],
    );

    return row;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `
        INSERT INTO contacts(name, email, phone, category_id)
        VALUES( $1, $2, $3, $4)
        RETURNING *
      `,
      [name, email, phone, category_id],
    );

    return row;
  }

  async update(id, contact) {
    const [row] = await db.query(
      `
      UPDATE contacts
      SET name = $2, email = $3, phone = $4, category_id = $5
      WHERE id = $1
      RETURNING *
    `,
      [id, contact.name, contact.email, contact.phone, contact.category_id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      `
      DELETE FROM contacts
      WHERE id = $1
      RETURNING *
    `,
      [id],
    );

    return deleteOp;
  }
}

module.exports = new ContactsRepository();