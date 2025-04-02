"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Image from 'next/image';
import bananaLogo from './banana.png';

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.imageSection}>
          <Image 
            src={bananaLogo} 
            alt="Banana Logo" 
            width={300} 
            height={300} 
            className={styles.logo}
          />
        </div>
        <form action={formAction} className={styles.formSection}>
          <h2 className={styles.title}>Admin Login</h2>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                className={styles.input} 
                required 
              />
            </div>
            <div className={styles.inputWrapper}>
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                className={styles.input} 
                required 
              />
            </div>
          </div>
          <button className={styles.loginButton}>Sign In</button>
          {state && <p className={styles.errorMessage}>{state}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;