import { AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import useAxios from "../hooks/useAxios";
import useFormData from "../hooks/useFormData";
import Button from "./Button";
import InputWithIcon from "./InputWithIcon";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { formData, handleFormDataChange } = useFormData();

  const { postData, loading } = useAxios();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await postData(
        "http://localhost:5000/users/login",
        credentials
      );

      const user = {
        ...response?.data.data.user,
        accessToken: response?.data.data.accessToken,
      };
      dispatch(setUser(user));
      navigate(from);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLoginFormSubmit}>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <InputWithIcon
          Icon={AiOutlineMail}
          id="email"
          placeholder="John@email.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
        />
      </div>
      <div className={styles.inputBlock}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <InputWithIcon
          Icon={MdPassword}
          id="password"
          placeholder="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormDataChange}
        />
      </div>
      <Button text="Login" shadow="light" loading={loading} />
    </form>
  );
};

export default LoginForm;
