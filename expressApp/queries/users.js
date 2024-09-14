
const addUsers =
"INSERT INTO users (first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id";

const getUserByUsername = "SELECT id, first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name FROM users WHERE user_name=$1"

const getUsersByUserid ="SELECT id, first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name FROM users WHERE id=$1"

const getUserRolesByUserid = "SELECT r.name FROM role r INNER JOIN userrole ur ON ur.role_id = r.id WHERE ur.user_id =$1"

module.exports = {
        addUsers,getUserByUsername, getUsersByUserid, getUserRolesByUserid
    }