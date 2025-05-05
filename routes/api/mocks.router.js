import express from 'express';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import Pet from '../../models/Pet.js'; // Asegurate de tener este modelo
const router = express.Router();

// Generador de usuarios
const generateMockUser = async () => {
    const hashedPassword = await bcrypt.hash('coder123', await bcrypt.genSalt(10));
    const role = faker.helpers.arrayElement(['user', 'admin']);

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: role,
        pets: []
    };
};

const generateManyMockUsers = async (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(await generateMockUser());
    }
    return users;
};

// Generador de mascotas
const generateMockPet = () => ({
    name: faker.animal.cat(),
    species: faker.animal.type(),
    birthDate: faker.date.birthdate(),
    adopted: faker.datatype.boolean()
});

const generateManyMockPets = (count) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push(generateMockPet());
    }
    return pets;
};

// GET /mockingusers
router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateManyMockUsers(50);
        res.json({ status: 'success', users });
    } catch (error) {
        console.error('Error al generar usuarios mock:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// GET /mockingpets
router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateManyMockPets(100);
        res.json({ status: 'success', pets });
    } catch (error) {
        console.error('Error al generar mascotas mock:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// POST /generateData
router.post('/generateData', async (req, res) => {
    const { users: usersCount, pets: petsCount } = req.body;

    try {
        let insertedUsers = [], insertedPets = [];

        if (usersCount) {
            const mockUsers = await generateManyMockUsers(parseInt(usersCount));
            insertedUsers = await User.insertMany(mockUsers);
        }

        if (petsCount) {
            const mockPets = generateManyMockPets(parseInt(petsCount));
            insertedPets = await Pet.insertMany(mockPets);
        }

        res.json({
            status: 'success',
            insertedUsers: insertedUsers.length,
            insertedPets: insertedPets.length
        });
    } catch (error) {
        console.error('Error al generar/insertar datos:', error);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;
