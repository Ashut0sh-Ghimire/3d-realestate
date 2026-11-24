// CHAT service: all database queries for this module live here.
// Controllers call these functions; nothing else touches the chat tables.
import { query } from "../../config/db.js";

// Example:
// export async function findById(id) {
//   const { rows } = await query("SELECT * FROM some_table WHERE id = $1", [id]);
//   return rows[0] ?? null;
// }

export { query };
