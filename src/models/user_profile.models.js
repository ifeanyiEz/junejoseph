import pool from '../db/index.js';

/**
 * Create a user profile
 * @param {Object} profileData
 * @param {string} profileData.user_id
 * @param {string} profileData.phone_number
 * @param {string} profileData.date_of_birth
 * @param {string} profileData.gender
 * @param {string} profileData.profile_picture
 * @param {string} profileData.bio
 * @param {boolean} profileData.profile_completed
 */
export async function createUserProfile(profileData) {
    const {user_id, phone_number, date_of_birth, gender, profile_picture, bio, profile_completed} = profileData;
    const instruction = 
    `INSERT INTO user_profiles (
    user_id, phone_number, date_of_birth, gender, profile_picture, bio, profile_completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING * ;`;
    
    const values = [user_id, phone_number || null, date_of_birth || null, gender, profile_picture || null, bio || null, profile_completed ?? false];
    
    const result = await pool.query(instruction, values);
    const newUserProfile = result.rows[0];

    console.log("This is the new profile: ", newUserProfile);

    return newUserProfile;
}

/**
 * Fetch a user profile by user_id
 * @param {string} userId
 * @returns {Object|null}
 */
export async function getUserProfileByUserId(userId) {
    const instruction = 
    `SELECT id, user_id, phone_number, date_of_birth, gender, profile_picture, bio, profile_completed, created_at, updated_at
    FROM user_profiles
    WHERE user_id = $1;`;
    
    const values = [userId];
    try {
        const { rows } = await pool.query(instruction, values);
        return rows[0] || null;
    
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}