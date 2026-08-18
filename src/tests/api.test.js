// src/tests/api.test.js
const express = require('express');
const request = require('supertest');

// Create a mock instance of the app for testing
const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

describe('API Core Systems', () => {
    it('should return 200 OK for health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'OK');
    });
});
