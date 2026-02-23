import pool from "../db/index.js";


export async function createUser(userData) {
    const {user_id, first_name, last_name, email, password} = userData;
    const instruction = 
    `INSERT INTO users (user_id, first_name, last_name, email, password) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING user_id, first_name, last_name, email, created_at, updated_at;`;

    const values = [user_id, first_name, last_name, email, password];

    const result = await pool.query(instruction, values);
    const newUser = result.rows[0];

    console.log("This new user is: ", newUser);

    return newUser;
}

export async function getAllUsers() {
    const instruction = 
    `SELECT user_id, first_name, last_name, email, created_at, updated_at
    FROM users
    ORDER BY created_at DESC;`;
    const result = await pool.query(instruction);
    const userAccounts = result.rows;
    
    console.log("Here's an array of all users: ", userAccounts);
    
    return userAccounts;
}
