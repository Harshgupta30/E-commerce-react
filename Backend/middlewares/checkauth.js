const jwt = require('jsonwebtoken');

function checkauth(req,res,next){
    jwt.verify(req.body.token, 'secret-key', (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decodedToken.userId;
       
        next();
      });
   return res.status(200)
}
module.exports=checkauth; 