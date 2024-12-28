const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user.model');
const cors = require('cors');
const bcrypt = require('bcrypt');
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
const hashPassword= async (password) => {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
};
//api
app.post('/users',async(req,res)=>{
    try{
        const hashedPassword=await hashPassword(req.body.password);
        const user=await User.create({
            ...req.body,
            password:hashedPassword
        });
    res.status(201).json(user);
    }catch(err){
        res.status(400).json(err);
    }
    
})
app.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
        }catch(err){
            res.status(400).json(err);
        }
})
app.get('/users/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const user=await User.findById(id);
        const email=user.email;
    res.status(200).json(email);

    }catch(err){
        res.status(400).json(err);
    }
    
})
app.get('/users/names/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne({ name: name }); 
          res.status(200).json(user);
        
    } catch (err) {
        res.status(400).json(err);
    }
});

mongoose.connect('mongodb+srv://admin:kingnimesh26@cluster0.xumxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'))
  .catch(()=>{
    console.log('Not connected');
  })
