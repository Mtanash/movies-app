import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import Button from "./Button";
import InputWithIcon from "./InputWithIcon";
import styles from "./SignupForm.module.css";

const SignupForm = () => {
  return (
    <form className={styles.signupForm}>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <InputWithIcon
          Icon={AiOutlineUser}
          id="username"
          placeholder="John"
          type="text"
        />
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <InputWithIcon
          Icon={AiOutlineMail}
          id="email"
          placeholder="John@email.com"
          type="email"
        />
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <InputWithIcon
          Icon={MdPassword}
          id="password"
          placeholder="Password"
          type="password"
        />
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <InputWithIcon
          Icon={MdPassword}
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
        />
      </div>
      <Button text="Sign up" shadow="light" />
    </form>
  );
};

export default SignupForm;
