import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Interview.css";

function Interview() {
    const location = useLocation();

    const {
        interviewType,
        role,
        technology,
        difficulty,
        questionCount
    } = location.state;

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    const generateQuestions = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/interview/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                interviewType,
                role,
                technology,
                difficulty,
                questionCount,
            }),
        });

        const data = await response.json();

        console.log(data);

        let text = data.questions;

        text = text.replace(/```json/g, "").replace(/```/g, "");

        const parsedQuestions = JSON.parse(text);

        setQuestions(parsedQuestions);
        console.log(parsedQuestions);
        console.log(parsedQuestions[0]);
        setLoading(false);

    } catch (error) {
        console.error(error);
    }
};
 
    useEffect(() => {
        generateQuestions();
    },[]);

    return(
         <div className="interview-container">
            <div className="interview-card">

                <h1 className="interview-title">
                    🤖 AI Interview chat!
                </h1>

                <div className="summary">
                    <p><strong>Interview Type:</strong> {interviewType}</p>
                    <p><strong>Role:</strong> {role}</p>
                    <p><strong>Technology:</strong>{technology}</p>
                    <p><strong>Difficulty:</strong>{difficulty}</p>
                    <p><strong>Question Count:</strong> {questionCount}</p>
                </div>

                <div className="question-section">
                    <div className="question-box">
                        Question {currentQuestion +1} /{questionCount}
                    </div>

                    <div className="question-test">
                        {loading ? (
                            "Loading questions..."
                        ) : (
                            <>
                                <h3>{questions[currentQuestion].topic}</h3>
                                <p>{questions[currentQuestion].question}</p>
                            </>
                        )}
                    </div>

                    <textarea className="answer-box"
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>

                <div className="button-group">
                    <button className="nav-btn"
                    disabled={currentQuestion === 0} 
                    onClick={() => setCurrentQuestion(currentQuestion -1)}>⬅ Previous</button>

                    <button className="nav-btn"
                    disabled={currentQuestion === questions.length -1}
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next ➡</button>
                </div>
            </div>
        </div>
    );
}

export default Interview;