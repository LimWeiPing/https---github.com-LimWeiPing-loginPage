
// dotenv library to load enviroment variables for sensitive info
if(process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const path = require('path');

const bodyParser = require("body-parser");
// const stripe = require('stripe')(stripeSecretKey);

const connection = require('./dbConfig'); //Mysql connection


connection.connect(function(err) {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

const express = require("express"); // get express module as a function
const app = express();

//cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));

//handle request from different origins
const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials:true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//sessions
//const sessions = require('express-session');
// const oneDay = 1000 * 60 * 60 * 24;   
// app.use(sessions({
//     secret: '7ae1d651e1d59dc9ca4604549ce98040901f85297fabe56be06fd20fce5ebe2d',
//     saveUninitialized:false,
//     cookie: { 
//         maxAge: oneDay,
//      },
//     sameSite: 'None',
//     resave: false
// }));

const { promisify }  = require('util');
//const queryAsync = promisify(connection.query).bind(connection);


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post('/SignupPage', async (req,res) => {
    const { Name, Email, Password, Phone, Country, Gender, Qualification } = req.body;

    // Check if the email is already registered
    const emailExistInSql = "SELECT * FROM users WHERE Email = ?";
    connection.query(emailExistInSql, Email, async (err, data) => {
        if(err) {
            console.error("Register error:", err);
            return res.json("error");
        } else {
            if(data.length > 0) {
                return res.json("Email Existed");
            }
        }
    })
        
    // Hash the password
    const passwordInString = JSON.stringify(Password)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordInString, salt);
        
    // parameterized queries and prepared statements with placeholders in mysql2
    const sql = "INSERT INTO users (Name, Email, Password, Phone, Country, Gender, Qualification) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Name,
        req.body.Email,
        hashedPassword,
        //req.body.Password,
        req.body.Phone,
        req.body.Country,
        req.body.Gender,
        req.body.Qualification
    ];

    connection.query(sql, values , (err, data) => {
        if(err) {
            console.error("Signup Database error:", err);
            return res.json("Error");
        }
        return res.json(data);
    })
}) 

app.post('/LoginPage',  (req,res) => {
    try {
        const { Email, Password, keepLoggedIn } = req.body;
        const passwordInString = JSON.stringify(Password)

        const sql = "SELECT * FROM users WHERE Email = ?";
        connection.query(sql, [Email], async (Err, Data) => {  

        const salt = await bcrypt.genSalt(10);
            if(Data <= 0) {
                return res.json({status: "error", error: "Invalid Email or Password"});
            } else if ( !await bcrypt.compare(passwordInString, Data[0].Password)) {
                return res.json({status: "error", error: "Invalid Email or Password"});
            } else {
                //session
                //req.session.user = Data[0];

            
                // token
                const user = Data[0];
                // Set the expiration time based on "Keep me logged in" option
                const expiresInLongOrShort = keepLoggedIn ? process.env.JWT_EXPIRES_LONG : process.env.JWT_EXPIRES;
                const token = jwt.sign({user}, process.env.JWT_SECRET, {
                    expiresIn: expiresInLongOrShort,
                })
                
                //cookie
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly: true,
                    resave: false,
                    saveUninitialized:false,
                    sameSite: 'None'
                }
                res.cookie('token', token, { path: '/', domain: 'localhost'} ,cookieOptions);

                //success login in then return
                res.status(200);
                return res.json({loggedIn: true, user: Data[0]})       
            }
        }) 
    }catch (Err) {
        console.log(Err);
    }
})

const userVerification = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({loggedIn: false, message:" token is required. "});
    }else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.json({message:"Authentication Error. "});
            } else {
                req.user = decoded.user;
                next();
            }
        })
    }

}

app.get( '/LoginPage', userVerification, (req, res) => {
   return res.json({loggedIn: true, user: req.user})
})

app.get( '/ProfilePage', userVerification, (req, res) => {
    // if(token){
    //     return res.json({loggedIn: true, user: req.user})
    // } else {
    //     return res.json({loggedIn: false})
    // }
    return res.json({loggedIn: true, user: req.user})
}) 

app.get( '/FormPage', userVerification, (req, res) => {
    const sql = "SELECT * FROM users"
    connection.query(sql, (err, data) => {
        if(err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({status:"error", error: "internet server error"}); 
        }
        if (data) {
            return res.json({loggedIn: true ,users: data });
        } else {
            return res.json({loggedIn: true , error: "No data" });
        }
    }) 
})

app.get('/LogoutPage', (req, res) => {
    // req.session.destroy((err) => {
    //     if(err) {
    //         console.error('Error destroying session:', err);
    //         return res.status(500).json({ status: 'error', message: 'Server error' });  
    //     }
    //     res.clearCookie('connect.sid'); // Clear session cookie
    //     console.log("clear cookie already")
    //     return res.json({ status: 'logout', message: 'Logged out successfully' });
    // })
    res.clearCookie('token', { path: '/', domain: 'localhost', expires: new Date(0), httpOnly: true});
    return res.json({ status: 'success', message: 'Logged out successfully' });

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
   console.log(`Listening on port ${PORT}... 
   TIC4303 Project Database is connected!`)
})

