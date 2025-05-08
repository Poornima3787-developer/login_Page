const User=require('../models/user');
const bcrypt=require('bcrypt');

const userLogin=async (req,res)=>{
  const {email,password}=req.body;
  console.log('Received login request:', { email, password });
  try {
    const user=await User.findOne({where:{email}});

    if(!user){
      return res.status(404).json({ message: 'Email not found' });
    }

    const passwordMatch=await bcrypt.compare(password,user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'User password is wrong' });
    }
    
    return res.status(200).json({ message: 'User login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  }

  const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
      const saltRound=10;
      const hashedPassword=await bcrypt.hash(password,saltRound);
      await User.create({ name, email, password:hashedPassword }); 
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { userLogin, userSignup };
