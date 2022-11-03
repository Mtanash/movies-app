import styles from "./InputWithIcon.module.css";

const InputWithIcon = ({
  type,
  id,
  placeholder,
  Icon,
  name,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputWithIcon}>
      <Icon className={styles.icon} />
      <input
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithIcon;
