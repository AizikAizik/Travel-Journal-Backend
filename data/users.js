import bcrypt from "bcryptjs";

const Users = [
    {
        fullName: "Isaac Ogunleye",
        email: "isaac.ogunleye@hotmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        fullName: "Jane Doe",
        email: "jane@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        fullName: "John Doe",
        email: "john@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
]

export default Users;