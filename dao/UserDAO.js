import User from '../models/User.js';

class UserDAO {
    static async findById(id) {
        return await User.findById(id);
    }

    static async findByEmail(email) {
        return await User.findOne({ email });
    }

    static async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }
}

export default UserDAO;