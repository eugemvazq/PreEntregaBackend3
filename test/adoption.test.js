// test/adoption.test.js
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Asegúrate de que la ruta a tu app.js sea correcta

describe('Adoption Routes', () => {
  describe('GET /api/adoption', () => {
    it('should return 200 and an array (ejemplo)', async () => {
      const res = await request(app).get('/api/adoption');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /api/adoption/:requestId', () => {
    it('should return 200 and the adoption request for a valid ID (ejemplo)', async () => {
      const res = await request(app).get('/api/adoption/123');
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id').equal('123');
    });

    it('should return 404 for an invalid adoption request ID (ejemplo)', async () => {
      const res = await request(app).get('/api/adoption/nonexistent');
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.have.property('message').equal('Solicitud de adopción no encontrada');
    });
  });

  describe('POST /api/adoption', () => {
    const newAdoptionRequest = {
      petId: 'testPet',
      userId: 'testUser'
    };

    it('should return 201 and a success message for a valid request (ejemplo)', async () => {
      const res = await request(app)
        .post('/api/adoption')
        .send(newAdoptionRequest)
        .set('Content-Type', 'application/json');
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property('message').equal('Solicitud de adopción creada');
      expect(res.body).to.have.property('id');
    });

    it('should return 400 for an invalid adoption request (missing fields) (ejemplo)', async () => {
      const invalidRequest = {};
      const res = await request(app)
        .post('/api/adoption')
        .send(invalidRequest)
        .set('Content-Type', 'application/json');
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('message').equal('Datos inválidos para la solicitud');
    });
  });

  
});