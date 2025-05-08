const jwt =require('jsonwebtoken');

module.exports=(req,res,next)=>{
  try {
    const token=req.header('Authorization');
    const decoded =jwt.verify(token,'a8f!0D#92Ld*9@ksj@!xYzP2$kjN3qZ9');
    req.user=decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}