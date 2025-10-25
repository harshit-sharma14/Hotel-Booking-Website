const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PythonShell } = require('python-shell');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const Booking=require('./models/Booking');
const path = require('path');
const multer=require('multer');
const Place=require('./models/Place');
const { userInfo } = require('os');
const e = require('express');
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/uploadsprofile',express.static(__dirname+'/profile'))
require('dotenv').config();
app.use(cors({
    credentials:true,
    origin:'https://hotel-booking-website-nine-green.vercel.app'
}))
app.use(cookieParser())
const jwtsecret='Harshit14'
const bcryptSalt=bcrypt.genSaltSync(10);
app.use(express.json())
app.get('/test',(req,res)=>{
    res.json('Hello there')
})
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Hello')
}).catch((e)=>{
    console.log(e)
})
//IJNvlhotcp3gD9gQ
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name || !email || !password || !address) {
            return res.status(422).json({ message: "All fields are required" });
        }
        
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            address,
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json({ message: e.message });
    }
});

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const user_login=await User.findOne({email});
    
    
    if(user_login){
        const passOk=bcrypt.compareSync(password,user_login.password);
        if(passOk){
            // jwt.sign({email:user_login.email,id:user_login._id},jwtsecret,{},(err,token)=>{
            //     if(err){
            //         throw err
            //     }
            //     res.cookie('token',token).json(user_login)
            // })
            jwt.sign(
                { email: user_login.email, id: user_login._id },
                jwtsecret,
                {},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    // Set the cookie
                    res.cookie('token', token, {
                        httpOnly: true, // Prevent client-side JavaScript access
                        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                        sameSite: 'strict', // Protect against CSRF attacks
                        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                    }).json(user_login);
                }
            );
            
        }
        else{
            res.status(422).send('Password not matched')
        }
    }else{
        res.json('Not Found')
    }
})
app.get('/profile', (req, res) => {
    
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, jwtsecret, {}, async (err, cookiedata) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
            try {
                const { name, email, _id } = await User.findById(cookiedata.id);
                if (!name || !email || !_id) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json({ name, email, _id });
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else {
        res.status(401).json({ error: 'No token found' });
    }
});

app.post('/logout', (req,res)=>{
    res.cookie('token','').json(true)
})
app.post('/upload-bylink',async (req,res)=>{
    const {link}=req.body;
    const newName='photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/'+newName
    })
    res.json(newName)
})
    const photosMiddleware=multer({dest:'uploads/'})
    const photosMiddlewareprofile=multer({dest:'profile/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            
            // Ensure the new path is properly renamed with the extension
            const newPath = `${path}.${ext}`;
            fs.renameSync(path, newPath);
            
            // Only push the relative path once
            uploadedFiles.push(newPath.replace(/^uploads[\\/]/, ''));
        }
    
        // Send the correct filenames back
        res.json(uploadedFiles);
    });
    app.post('/uploadprofile', photosMiddlewareprofile.array('photos', 1), (req, res) => {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            
            // Ensure the new path is properly renamed with the extension
            const newPath = `${path}.${ext}`;
            fs.renameSync(path, newPath);
            
            // Only push the relative path once
            uploadedFiles.push(newPath.replace(/^uploads[\\/]/, ''));
        }
    
        // Send the correct filenames back
        res.json(uploadedFiles);
    });
app.post('/places',async (req,res)=>{   
    const {title,address,description,perks,extraInfo,checkInInfo,checkOutInfo,maxGuests,addedPhotos,price}=req.body;
    const {token}=req.cookies;
    console.log('Hello')
    jwt.verify(token,jwtsecret,{},async (err,cookiedata)=>{
        
        const placeDoc=await Place.create({
            owner:cookiedata.id,
            title,
            address,
            description,
            perks,
            extraInfo,
            checkInInfo,
            checkOutInfo,
            maxGuests,
            photos:addedPhotos,
            price,
        })
        console.log('Data is inserted');
        res.json(placeDoc)
    
    })
    
    
})
app.get('/places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtsecret,{},async (err,cookiedata)=>{
        const {id}=cookiedata;
        res.json(await Place.find({owner:id}));
        
    
    })
})
app.get('/place/:id',async (req,res)=>{
    const {id}=req.params;
    
    res.json(await Place.findById(id))
})
app.put('/places',async (req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,addedPhotos,description,perks,extraInfo,checkInInfo,checkOutInfo,maxGuests,price}=req.body;
  
    jwt.verify(token,jwtsecret,{},async (err,cookiedata)=>{
        const placeDoc=await Place.findById(id);
        if(cookiedata.id==placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,description,perks,extraInfo,checkInInfo,checkOutInfo,maxGuests,price
            })
            placeDoc.save();
            res.json('ok');            
        }
    })
})
function getuserData(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtsecret,{},async (err,cookiedata)=>{
            if(err){
                reject(err)
            }
            const {id}=cookiedata;
            resolve(id)
        })
    })
}
app.get('/allplaces',async (req,res)=>{
    res.json(await Place.find());
})
// app.post('/booking',(req,res)=>{
//     const userdata=getuserData(req);
//     const {place,checkInInfo,checkOutInfo,maxGuests,name,phone,price}=req.body;
//     Booking.create({
//         place,checkInInfo,checkOutInfo,maxGuests,name,phone,price,id:userdata.id
//     }).then((data)=>{
//         res.json(data)
//     }).catch((e)=>{
//         res.status(422).json(e)
//     }  )  
// })
app.post('/logout',(req,res)=>{
    try {
        // Clear the token from the cookies
        res.clearCookie('token', { 
            httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies
            sameSite: 'strict', // Ensures the cookie is sent only for same-site requests
        });

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Error logging out', details: err.message });
    }
})
app.post('/booking', async (req, res) => {
    try {
        // Step 1: Verify the token from cookies
        const {token}=req.cookies;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access: No token provided' });
        }

        jwt.verify(token, jwtsecret, {}, async (err, cookiedata) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized access: Invalid token' });
            }

            const userId = cookiedata.id; // Extract user ID from the token

            // Step 2: Extract booking details from the request body
            const { place, checkInInfo, checkOutInfo, maxGuests, name, phone, price } = req.body;

            // Step 3: Create the booking linked to the authenticated user's ID
            const booking = await Booking.create({
                user: userId, // Link the booking to the authenticated user
                place,
                checkInInfo,
                checkOutInfo,
                maxGuests,
                name,
                phone,
                price,
            });

            // Step 4: Respond with the newly created booking
            res.status(201).json(booking);
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(422).json({ error: 'Could not create booking', details: error.message });
    }
});

// app.get('/bookings', async (req, res) => {
//     try {
//         const userData = await getuserData(req);
//         const bookings = await Booking.find({ id: userData.id }).populate('place');
//         console.log(bookings);
//         res.json(bookings);
//     } catch (e) {
//         res.status(500).json({ error: 'Error fetching bookings', details: e });
//     }
// });
// app.get('/bookings', async (req, res) => {
//     try {
//         const userData = await getuserData(req);  // Assuming this function gives you the user data
//         const bookings = await Booking.find({ user: userData.id }).populate('place');
//         res.json(bookings);
//     } catch (e) {
//         res.status(500).json({ error: 'Error fetching bookings', details: e });
//     }
// });

app.get('/bookings', async (req, res) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access: No token provided' });
        }

        // Verify JWT with your secret key
        jwt.verify(token, jwtsecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized access: Invalid token' });
            }

            // Fetch bookings for the authenticated user
            console.log(decoded);
            const bookings = await Booking.find({ user: decoded.id }).populate('place');
            console.log(decoded.id);
            if (!bookings.length) {
                return res.status(404).json({ message: 'No bookings found for this user' });
            }

           
            res.status(200).json(bookings);
        });
    } catch (e) {
        console.error('Error fetching bookings:', e);
        res.status(500).json({ error: 'Error fetching bookings', details: e.message });
    }
});

// app.post('/summarize', (req, res) => {
//     let options = {
//         mode: 'text',
//         pythonOptions: ['-u'],
//         scriptPath: './',
//         args: [req.body.text]
//     };

//     PythonShell.run('Sum.py', options, (err, results) => {
//         if (err) res.status(500).send(err);
//         res.send(results);
//     });
// });

app.listen(4000)