const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const fs = require('fs');

// Import Models
const User = require('./models/user'); 
const Employee = require('./models/employee'); 

const app = express();
const PORT = 8000;
const dbUrl = "mongodb://localhost:27017/AdminPanel";

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL (React app)
  credentials: true, 
};

// Middleware setup
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


// Check and create the 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory
}

app.use('/uploads', express.static(uploadDir)); // Serve static files from the uploads directory

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the filename
  },
});

const upload = multer({ storage: storage });

// Setup session middleware for local storage using FileStore
app.use(
  session({
    name: 'session-id', 
    secret: 'my_secret_key', 
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: path.join(__dirname, 'sessions') }), 
    cookie: {
      maxAge: 3600000, 
      httpOnly: true, 
      secure: false, 
      sameSite: 'lax', 
    },
  })
);

// Connect to MongoDB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

// Routes

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { f_sno, f_userName, f_Pwd } = req.body;

    
    if (!f_sno || !f_userName  || !f_Pwd) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

   
    let user = await User.findOne({ f_userName });
    if (user) return res.status(400).json({ msg: 'User already exists' });

   
    const hashedPassword = await bcrypt.hash(f_Pwd, 10);

    
    user = new User({ f_sno, f_userName, f_Pwd: hashedPassword });
    await user.validate(); 
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'User already exists, username and email should be unique' });
    }
    res.status(500).send('Server Error');
  }
});


app.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    const user = await User.findOne({ f_userName });
    if (!user) return res.status(400).json({ msg: 'Invalid Username' });

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

    
    req.session.user = {
      id: user._id,
      f_userName: user.f_userName,
      f_Email: user.f_Email, 
    };

    console.log('User logged in:', req.session.user); 

    res.json({ msg: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Check session info
app.get('/profile', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ msg: 'Error logging out' });
      }
      res.clearCookie('session-id'); 
      res.json({ msg: 'Logged out successfully' });
    });
  } else {
    res.status(400).json({ msg: 'No active session' });
  }
});

// Create Employee
app.post('/employees', upload.single('f_Image'), async (req, res) => {
  try {
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

   
    if (!f_Id || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender) {
      return res.status(400).json({ msg: 'All required fields must be filled' });
    }

    
    const employee = new Employee({
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image: req.file ? req.file.path : '',
    });

    await employee.validate();
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search Employee
app.get('/employees/search', async (req, res) => {
  const keyword = req.query.keyword || '';
  try {
    const employees = await Employee.find({ f_Name: new RegExp(keyword, 'i') });
    if (!employees.length) {
      return res.status(404).json({ msg: 'No employees found matching your query' });
    }
    res.json(employees);
  } catch (error) {
    res.status(500).send('Error searching employees');
  }
});

// Get All Employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get  Employee by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Employee
app.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



