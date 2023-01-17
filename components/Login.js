import { useState } from 'react';
import Cookies from 'universal-cookie';
import consts from './consts';
import styles from '../styles/Login.module.css';

const Login = ({ redirectPath }) => {
  const [password, setPassword] = useState('');

  return (
    <div className={styles.login}>
      <form>
        <label className={styles.loginLabel}>
          <span>Enter Password</span>
          <input
            type="text"
            className={styles.loginInput}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button
          type="submit"
          className={styles.loginButton}
          onClick={(e) => {
            e.preventDefault();
            const cookies = new Cookies();
            cookies.set(consts.SiteReadCookie, password, {
              path: '/',
            });
            window.location.href = redirectPath ?? '/';
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
