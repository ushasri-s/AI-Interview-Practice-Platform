import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            alert(response.data.message);

            localStorage.setItem("token",response.data.token);

            navigate("/dashboard");

        }catch(error){
            alert(error.response.data.message || error.message);
        }
    };

    return(
        <div>
            <h1>Login</h1>

            <input
                 type = "email"
                 placeholder= "Enter your email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
            />

            <br></br>

            <input 
                 type ="password"
                 placeholder= "Enter your password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
            />

            <br></br>
            <button onClick={handleLogin}>
                Login
            </button>

            <hr />

            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </div>
    );
}

export default Login;