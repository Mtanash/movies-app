import LoginForm from "../components/LoginForm";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <section className={styles.authPage}>
      <div className={`container ${styles.authPageContainer}`}>
        <div className={styles.card}>
          <h2 className={styles.pageTitle}>Login</h2>
          <LoginForm />
          {/* <SignupForm /> */}
          <p className={styles.footer}>Don't have an account? Sign up</p>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
