const mongoose = require('mongoose');
const initData = require('./data.js'); // Ensure this imports an array
const Mongo_URL = "mongodb://localhost:27017/AdminPanel";
const Employee = require("../models/employee.js");




main()
.then(()=>{
    console.log("connnected to db");
    
})
.catch( (err) =>{
    console.log(err);  
})

  async function main()
  {
     await mongoose.connect(Mongo_URL);
  } 

const initDB = async() =>{
    await Employee.deleteMany({});

    initData.data = initData.data.map((obj) =>({
        ...obj, // Spread the existing properties
    f_Image: "https://th.bing.com/th?id=OIP.PKlD9uuBX0m4S8cViqXZHAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" 
        
    }));

    await Employee.insertMany(initData.data);

    console.log("data was initilized");
}

initDB();
