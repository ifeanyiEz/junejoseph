import pool from "../db/index.js";


export async function createUser(userData) {
    const {user_id, first_name, last_name, email, password, role_id} = userData;
    const instruction = 
    `INSERT INTO users (user_id, first_name, last_name, email, password, role_id) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING user_id, first_name, last_name, email, role_id created_at, updated_at;`;

    const values = [user_id, first_name, last_name, email, password, role_id];

    const result = await pool.query(instruction, values);
    const newUser = result.rows[0];

    console.log("This new user is: ", newUser);
    console.log("This new user is registered with role_id: ", newUser.role_id);

    return newUser;
}

export async function getAllUsers() {
    const instruction = 
    `SELECT user_id, first_name, last_name, email, created_at, updated_at
    FROM users
    ORDER BY created_at DESC;`;
    const result = await pool.query(instruction);
    const userAccounts = result.rows;
    
    return userAccounts;
}

export async function getUserByEmail(email) {
    const instruction = `
        SELECT 
            u.user_id, u.first_name, u.last_name, u.email, u.password, 
            r.name AS role_name, r.permissions, r.constraints
        FROM users u
        INNER JOIN roles r ON u.role_id = r.id
        WHERE u.email = $1;
    `;
    const values = [email];
    const result = await pool.query(instruction, values);

    const user = result.rows[0] || null;
    
    return user;
}
