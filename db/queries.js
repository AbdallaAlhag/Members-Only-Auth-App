const pool = require('./pool');
async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages JOIN users ON messages.user_id = users.id");
    return rows;
}

async function deleteMessageQuery(id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

async function insertMessageQuery(title, content, user_id) {
    await pool.query('INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)', [title, content, user_id]);
}

module.exports = {
    getMessages,
    deleteMessageQuery,
    insertMessageQuery
};