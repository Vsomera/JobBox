// registerPage.tsx

import { useState } from 'react';
import styles from './Register.module.css';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../config/auth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  document.title = "JobBox.io | Register";
  
  const navigate = useNavigate()

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt with:', { email, password });
    
    try {
      await doCreateUserWithEmailAndPassword(email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  
  };

  return (
    <div className={styles.authContainer}>
      {/* Auth form on the right */}
      <div className={styles.authFormContainer}>
        <div className={styles.authForm}>
          {/* Logo at the top of the form */}
          <div className={styles.logoContainer}>
            <img 
              src="/jobBoxLogo.png" 
              alt="JobBox.io Logo"
              className={styles.logoImage}
            />
            <span className='ml-2'>JobBox.io</span>
          </div>

          {/* Change heading to "Register with Email" */}
          <h1 className={styles.authTitle}>Register with Email</h1>

          <div className={styles.formContent}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.divider}>
                <span className={styles.line}></span>
                <span className={styles.orText}>or</span>
                <span className={styles.line}></span>
              </div>

              <div className={styles.socialLogin}>
                {/* Change button text to "Register with GitHub" */}
                <button type="button" className={styles.socialButton}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Register with GitHub
                </button>

                {/* Change button text to "Register with Google" */}
                <button type="button" 
                onClick={async () => {
                  try {
                    await doSignInWithGoogle();
                    navigate('/')
                  } catch (err) {
                    console.log(err)
                  }
                }}
                className={styles.socialButton}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                  >
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  Register with Google
                </button>
              </div>

              {/* Submit button text changed to "Register" */}
              <button type="submit" className={styles.loginButton}>
                Register
              </button>
            </form>
          </div>

          {/* Link text changed to direct existing users back to Login */}
          <div className={styles.registerLink}>
            Already have an Account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};
