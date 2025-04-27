import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true); // ✅ Start loading

    try {
      let user = null;
      if (signState === "Sign In") {
        user = await login(email, password);
      } else {
        user = await signup(name, email, password);
      }

      if (user) {
        setLoading(false); // ✅ Stop loading before navigating
        navigate("/");
      } else {
        setLoading(false); // ✅ Stop loading if login/signup failed
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      setLoading(false); // ✅ Ensure loading is stopped on error
    }
  };

  return (
    loading ? (
      <div className="loading-spinner">
        <img src={netflix_spinner} alt="Loading..." /> {/* ✅ Fixed spinner image */}
      </div>
    ) : (
      <div className='Login'>
        <img src={logo} className="login-logo" alt="Netflix Logo" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" && (
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your Name"
              />
            )}
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Your Email"
            />
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Your Password"
            />
            <button onClick={user_auth} type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
