// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// const User = require('./models/Users');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const imageDownloader = require('image-downloader');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const Place = require('./models/Place');
// const Text = require('./models/Text'); // Import the Text model
// require('dotenv').config();

// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
// }));
// app.use(cookieParser());
// app.use(express.json());

// // Set up storage engine for multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
//     }
// });
// const upload = multer({ storage: storage });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((e) => {
//     console.log(e);
// });

// // Endpoint to handle image upload along with title and description
// app.post('/upload', upload.single('image'), async (req, res) => {
//     const { title, description } = req.body;
//     try {
//         const file = req.file;
//         // Save the uploaded file information along with title and description to the database
//         const newText = new Text({
//             title,
//             description,
//             imageUrl: file.path
//         });
//         await newText.save();

//         res.status(200).json({
//             message: 'Image uploaded successfully',
//             file: req.file,
//             title,
//             description
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get all texts
// app.get('/texts', async (req, res) => {
//     try {
//         const texts = await Text.find();
//         res.status(200).json(texts);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Endpoint to get all places
// app.get('/places', async (req, res) => {
//     try {
//         const places = await Place.find();
//         res.status(200).json(places);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.use('/uploads', express.static('uploads'));

// app.listen(4000, () => {
//     console.log('Server is running on http://localhost:4000');
// });