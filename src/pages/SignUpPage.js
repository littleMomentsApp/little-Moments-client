import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${baseUrl}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className={"SignupPage " + theme}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>
        Already have an account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}

export default SignUpPage;
