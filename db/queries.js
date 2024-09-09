const pool = require('./pool');
async function getMessages() {
    const { rows } = await pool.query(`
        SELECT messages.id AS id, title, content, timestamp, 
               users.first_name, users.last_name, users.username
        FROM messages
        JOIN users ON messages.user_id = users.id
    `);

    return rows;
}

async function deleteMessageQuery(id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}



async function insertMessageQuery(title, content, user_id) {
    const result = await pool.query('INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, content, user_id]);
    console.log(`Inserted message with id ${result.rows[0].id}`);
    return result.rows[0].id;
}

async function updateAdminQuery(id) {
    await pool.query('UPDATE users SET admin_status = true WHERE id = $1', [id]);
}


module.exports = {
    getMessages,
    deleteMessageQuery,
    insertMessageQuery,
    updateAdminQuery
};