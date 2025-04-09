import UserDAO from '../dao/UserDAO.js';
import UserDTO from '../dto/UserDTO.js';

class UserRepository {
    static async getCurrentUser(id) {
        const user = await UserDAO.findById(id);
        return new UserDTO(user);
    }

    static async registerUser(userData) {
        return await UserDAO.createUser(userData);
    }

    static async loginUser(email) {
        return await UserDAO.findByEmail(email);
    }
}

export default UserRepository;