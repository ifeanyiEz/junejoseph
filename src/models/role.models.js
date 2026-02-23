import pool from "../db/index.js";


export async function createRole(roleData) {
    const {name, parent, description, permissions, constraints, status} = roleData;
    const instruction = 
    `INSERT INTO roles (name, parent, description, permissions, constraints, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, parent, description, permissions, constraints, status, created_at;`;

    const values = [name, parent, description, permissions, constraints, status];

    const result = await pool.query(instruction, values);
    const newRole = result.rows[0];

    console.log("New role is: ", newRole);

    return newRole;
}

export async function getAllRoles() {
    const instruction = `SELECT * FROM roles ORDER BY id;`;
    const result = await pool.query(instruction);

    const userRoles = result.rows;
    console.log("All user roles: ", userRoles);

    return userRoles;
}
