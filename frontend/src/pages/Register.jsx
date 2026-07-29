import axios from "axios";
import { useState } from "react";


function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async() => {
        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );
            console.log(response.data.message); 
        }catch(error){

            console.log(error.response.data.message);
        }
    } 

    return(
        <div>
            <h1>Register</h1>

            <input
                 type ="text"
                 placeholder = "Enter your Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
            />
            <br></br>

            <input
                 type= "email"
                 placeholder = "Enter your Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
            />

            <br></br>

            <input
                 type = "password"
                 placeholder = "Enter your Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
            />

            <br></br>

            <button onClick ={handleRegister}>
                Register</button>

            <hr />

            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Password: {password}</p>

        </div>
    );
}

export default Register;