const {verifyToken} = require('../utils/jwtHelper');
const {getUserRolesByUserid} = require('../repositories/users');

const verifyTokenHandler = async (req,res,next)=>{
    let token = req.headers['authorization'];
    if(token && token.includes('Bearer ')){
        try{
        const result = await verifyToken(token);
        const userid = result.userid;
        req.userid = userid;
        return next();
        }catch(error){
            res.status(401).json({message : 'Invalid token'})
    }
    }else{
        res.status(401).json({message: 'No token provided'})
    }
    };


const verifyRoles = (roles)=>{
    return async (req,res,next)=>{
        const userid = req.userid;
        const userRoles = await getUserRolesByUserid(userid);
        //let hasRole = false;
        
       // for (let userRole of userRoles){
          //  if(roles.includes(userRole.name)){
           //     hasRole = true;
            //    break;}}
        const hasRole = userRoles.some(userRole => roles.includes(userRole.name));
        if(hasRole){
            next()
        }else{
            return res.status(403).json({
                message:"You don't have permission"
            })
        }
    }
}

module.exports = {verifyTokenHandler, verifyRoles};