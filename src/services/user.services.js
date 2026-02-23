import { hashPassword } from '../utils/password_hash.util.js';
import { slugGen } from '../utils/slug.util.js';
import { createUser } from '../models/user.model.js';


export async function registerUser(userData) {
    const user_id = slugGen(userData.email);
    const hashedPassword = await hashPassword(userData.password);
    
    return createUser({
        ...userData,
        user_id,
        password: hashedPassword
    });
}
