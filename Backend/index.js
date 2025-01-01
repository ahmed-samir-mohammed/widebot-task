// import { configDotenv } from 'dotenv'
// import express, { json } from 'express'
// import { connect } from 'mongoose'
// import jsend from 'jsend'
// import { userRouter } from './routes/user.route.js' // Handeler request
// import cors from 'cors'

// const app = express()
// app.use(json())
// app.use(cors())
// configDotenv()

// connect(process.env.CONNECTION_URL).then(() => {
//     console.log('Connected to MongoDB!')
// })

// app.use('/api/users', userRouter)

// // 404 not found middleware for route
// app.all('*', (req, res, next) => {
//     res.status(404).json(jsend.error('NOT FOUND'))
// })

// // Gloabl Error handeler
// app.use((error, req, res, next) => {
//     ;
//     res.status(error.statusCode || 500).json(
//         error.status == 'fail'
//             ? jsend.fail(error.message)
//             : jsend.error(error.message)
//     )
// })

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`EListening on port ${process.env.PORT}!`)
// })


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simulated users
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: 'Login successful', role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});