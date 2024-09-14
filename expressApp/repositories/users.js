const pool =require('../config/db');
const usersQueries = require('../queries/users');
const {hashPassword} = require('../utils/passwordHelper');

const createUsers = (first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name)=>{
    const hashedPassword = hashPassword(password);
    return new Promise((resolve,reject)=>{
    pool.query(usersQueries.addUsers,
        [first_name,last_name,hashedPassword,dob,address,place,city,district,state,email,phone,user_name],
    (error,results)=>
        {
        if(error){
                console.error(error);
                reject(error);
            }else{
            const userid = results.rows.length>0?results.rows[0].id : undefined;
            resolve(userid);
            }
        })
        }  )
};

const getUserByUsername = (user_name)=>{
    return new Promise ((resolve,reject)=>{
        pool.query(usersQueries.getUserByUsername,[user_name],(error,results)=>{
            if(error){
                console.error( error);
                reject(error);
            }else {
                resolve(results.rows)
            }
        })
    })
};

const getUsersByUserid=(userid)=>{
    return new Promise((resolve,reject)=>{
        pool.query(usersQueries.getUsersByUserid,[userid],(error,results)=>{
            if(error){
                reject(error);
            }else{
                resolve(results.rows)
            }
        })
    })
};

const getUserRolesByUserid =(userid)=>{
    return new Promise((resolve,reject)=>{
        pool.query(usersQueries.getUserRolesByUserid ,[userid],(error,results)=>{
            if(error){
                reject(error);
            }else{
                resolve(results.rows)
                
        }
    })
})};

module.exports = {createUsers, getUserByUsername, getUsersByUserid, getUserRolesByUserid};