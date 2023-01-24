db = db.getSiblingDB('CC20230123');

db.createUser({
  user: 'usr_CC20230123',
  pwd: '#4dm1n@2023',
  roles: [{ role: 'readWrite', db: 'CC20230123' }],
});
db.createCollection('users');
db.createCollection('citizens');

db.users.insertOne({
  _id: '952456ae-968b-4eba-a1ae-7d7a5f15e37c',
  firstname: 'Usuario',
  lastname: 'Administrator',
  username: 'admin',
  email: 'infoconsulta@gmail.com',
  password: '$2a$10$3HnquuVx12vpQ2NM8OL1xeehURCfoYigg9YJsirChNfRfBfTVcvMy',
  resetPassword: false,
  active: true,
  role: 'super',
});

// Admin password #4dm1n@2023
