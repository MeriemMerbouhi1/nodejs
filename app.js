import express from 'express';
import { connectToMongoDB } from './db/app.mjs';
import userRouter from './routes/index.mjs';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';


const app = express();
app.use(logger)
app.use(morgan('dev'));


app.use('/',userRouter);
app.set('view engine', 'pug')
app.get('/index', (req, res) => {
  res.render('views.index', { title: 'Meriem', message: 'Hello there!' })
})
// Body parsing middleware
app.use(express.json());

//middlwares
app.get('/user',auth,(req,res)=>{
  console.log('user page')
  res.send('user page')
})

function logger(req,res,next){
  console.log('logging')
  next()
}
function auth(req,res,next){
  if(req.query.admin === 'true'){
    next()
  }
  else{
    res.send('unauthorized')
  }
  
}

// Secret key for signing and verifying JWT
const secretKey = '1234567890';

// Example of creating a JWT
app.get('/generate-token', (req, res) => {
  const user = { id: 123, username: 'Meriem' };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.json({user,token});
});

// Example of verifying a JWT
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const token = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6ImV4YW1wbGVVc2VyIiwiaWF0IjoxNzA3MzIzNzEwLCJleHAiOjE3MDczMjczMTB9.om1aQvtsfyssDgzIS1x0epQSizPmayEIMUnB81ha9MI'; // Replace with the actual token
fetch('http://localhost:3000/protected-route', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Started on port 3000");
});
// connection to mongodb
async function main() {
  try {
    
    // Ensure your connectToMongoDB function is exported correctly
    const db = await connectToMongoDB();

    // Perform database operations here

  } catch (err) {
    console.error('Error in main function:', err);
  }
}

// Call the main function
main();
