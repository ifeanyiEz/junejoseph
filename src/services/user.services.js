import { hashPassword } from '../utils/password_hash.utils.js';
import { slugGen } from '../utils/slug.utils.js';
import { createUser } from '../models/user.models.js';
import { comparePassword } from '../utils/password_hash.utils.js';
import { getUserByEmail } from '../models/user.models.js';


export async function registerUser(userData) {
    const user_id = slugGen(userData.email);
    const hashedPassword = await hashPassword(userData.password);
    
    return createUser({
        ...userData,
        user_id,
        password: hashedPassword
    });
}

export async function loginUser(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        return null;
    }

    return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    };
}
