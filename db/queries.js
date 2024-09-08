const pool = require('./pool');
async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages JOIN users ON messages.user_id = users.id");
    return rows;
}

async function deleteMessageQuery(id){
    console.log(id)
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}
// export async function insertUsername(username, text) {
//     await pool.query("INSERT INTO minimessageboard (username, text) VALUES ($1, $2)", [username, text]);
// }

// export async function getSingleMessages(id) {
//     const { rows } = await pool.query("SELECT * FROM minimessageboard WHERE id = $1", [id]);
//     return rows[0] || null;
// }

module.exports = {
    getMessages,
    deleteMessageQuery
};