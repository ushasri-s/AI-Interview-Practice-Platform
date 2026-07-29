import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const [user, setUser] = useState(null);

    const [interviewType, setInterviewType] = useState("");
    const [role,setRole] = useState("");
    const [technology, setTechnology] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [questionCount, setQuestionCount] = useState(5);

    const roleTechnologies = {
    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React"
    ],

    "Backend Developer": [
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL"
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB"
    ],

    "Java Developer": [
        "Core Java",
        "Spring Boot",
        "SQL",
        "DBMS"
    ],

    "Python Developer": [
        "Python",
        "Django",
        "Flask",
        "SQL"
    ]
};

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleStartInterview =() => {
        if(
            interviewType === "Technical Interview" &&
            (!role || !technology)
        ){
            alert("Please select Role and Technology");

            return;
        }

        console.log({
            interviewType,
            role,
            technology,
            difficulty,
            questionCount
        });
    }
     const handleInterviewTypeChange = (e) => {
        const selectedType = e.target.value;

        setInterviewType(selectedType);

        setRole("");
        setTechnology("");
     }

    useEffect(() => {
        const fetchProfile = async () =>{
            try{
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);
                setUser(response.data);
            }catch(error){
                console.log(error.response?.data || error.message);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className = "dashboard-container">

            {user ? (
                <div className = "dashboard-card">

                <h1 className = "title">
                    AI Interview Practice
                </h1>

                    <h2 className = "welcome">
                        Welcome, {user.name} 👋
                    </h2>

                    <p className = "email">
                        Email, {user.email}
                    </p>

                    <div className="form-group">
                        <label>Interview Type:</label>

                        <select
                            value={interviewType}
                            onChange ={handleInterviewTypeChange}
                        >
                            <option value="">Select Interview Type</option>
                            <option value="Technical Interview">Technical Interview</option>
                            <option value="HR Interview">HR Interview</option>

                        </select>
                    </div>
                    {interviewType === "Technical Interview" && (
                        <div className="form-group">
                            <label>Role:</label>
                            
                            <select
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setTechnology("");
                                }}
                            >
                                <option value="">Select Role</option>

                                <option value="Frontend Developer">
                                    Frontend Developer
                                </option>

                                <option value="Backend Developer">
                                    Backend Developer
                                </option>

                                <option value="Full Stack Developer">
                                    Full Stack Developer
                                </option>

                                <option value="Java Developer">
                                    Java Developer
                                </option>

                                <option value="Python Developer">
                                    Python Developer
                                </option>
                            </select>
                        </div>
                    )}

                    {interviewType === "Technical Interview" && role && (
                        <div className="form-group">
                            <label>Technology:</label>

                            <select
                                value={technology}
                                onChange={(e) => setTechnology(e.target.value)}
                            >
                                <option value="">Select Technology</option>

                                {roleTechnologies[role].map((tech) => (
                                    <option key={tech} value ={tech}>
                                        {tech}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Difficulty:</label>

                        <button
                            onClick={() => setDifficulty("Easy")}
                            style={{
                                backgroundColor: difficulty === "Easy" ? "#2563eb" : "#e5e7eb",
                                color: difficulty === "Easy" ? "white" : "black",
                                marginRight: "10px",
                                padding: "8px 16px"
                            }}
                        >
                            Easy
                        </button>

                        <button
                            onClick={() => setDifficulty("Medium")}
                            style={{
                                backgroundColor: difficulty === "Medium" ? "#2563eb" : "#e5e7eb",
                                color: difficulty === "Medium" ? "white" : "black",
                                marginRight: "10px",
                                padding: "8px 16px"
                            }}
                        >
                            Medium
                        </button>

                        <button
                            onClick={() => setDifficulty("Hard")}
                            style={{
                                backgroundColor: difficulty === "Hard" ? "#2563eb" : "#e5e7eb",
                                color: difficulty === "Hard" ? "white" : "black",
                                padding: "8px 16px"
                            }}
                        >
                            Hard
                        </button>       
                    </div>

                    <div className="form-group">
                        <label>Number of Questions:</label>

                        <button
                            onClick={() => setQuestionCount(5)}
                            style={{
                                backgroundColor: questionCount === 5 ? "#2563eb" : "#e5e7eb",
                                color: questionCount === 5 ? "white" : "black",
                                marginRight: "10px",
                                padding: "8px 16px"
                            }}
                        >
                            5
                        </button>

                        <button
                            onClick={() => setQuestionCount(10)}
                            style={{
                                backgroundColor: questionCount === 10 ? "#2563eb" : "#e5e7eb",
                                color: questionCount === 10 ? "white" : "black",
                                marginRight: "10px",
                                padding: "8px 16px"
                            }}
                        >
                            10
                        </button>

                        <button
                            onClick={() => setQuestionCount(15)}
                            style={{
                                backgroundColor: questionCount === 15 ? "#2563eb" : "#e5e7eb",
                                color: questionCount === 15 ? "white" : "black",
                                marginRight: "10px",
                                padding: "8px 16px"
                            }}
                        >
                            15
                        </button>

                        <button
                            onClick={() => setQuestionCount(20)}
                            style={{
                                backgroundColor: questionCount === 20 ? "#2563eb" : "#e5e7eb",
                                color: questionCount === 20 ? "white" : "black",
                                padding: "8px 16px"
                            }}
                        >
                            20
                        </button>
                    </div>

                    <div className="form-group">
                        <button
                            className="start-button"
                            onClick ={handleStartInterview}
                        > 
                        🚀 Start Interview
                        </button>
                    </div>  

                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) :(
                <p>Loading...</p>
            )
            }
        </div>
    );
}

export default Dashboard;