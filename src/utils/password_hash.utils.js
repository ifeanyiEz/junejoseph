import bcrypt from "bcrypt";

const saltRounds = 12;

export async function hashPassword(password) {
    try {
        const password_hash = await bcrypt.hash(password, saltRounds);
        return password_hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password.");
    }
}

export async function comparePassword(password, password_hash) {
    try {
        const password_match = await bcrypt.compare(password, password_hash);
        return password_match;
    } catch (error) {
        console.error("Error comparing password:", error);
        return false;
    }
}