import pool from "../../config/db";
import { parseJSON } from "../../utils/json.helper";

/**
 * Find user by email
 */
export const findUserByEmail = async (email: string) => {
  const [rows]: any = await pool.query(
    `SELECT
       *,
       JSON_EXTRACT(details, '$.*') as details_values,   -- Changed alias
       JSON_EXTRACT(add_json, '$.*') as add_json_values  -- Changed alias
     FROM users
     WHERE email = ? AND is_active = 1
        OR JSON_UNQUOTE(JSON_EXTRACT(details, '$.phone')) = ?
     LIMIT 1;
    `,
    [email, email],
  );

  if (!rows.length) return null;

  const user = rows[0];

  // ✅ Clean up the JSON strings using your util
  user.details = parseJSON(user.details);
  user.add_json = parseJSON(user.add_json);
  user.details_values = parseJSON(user.details_values);
  user.add_json_values = parseJSON(user.add_json_values);

  return user;
};

/**
 * Create new user
 */
export const createUser = async (data: {
  user_id: string;
  name: string;
  email: string;
  password: string;
}) => {
  const [result]: any = await pool.query(
    `INSERT INTO users (name, email, password, status)
     VALUES (?, ?, ?, 'active')`,
    [data.name, data.email, data.password],
  );

  return result.insertId;
};
