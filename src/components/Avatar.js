import styles from "./Avatar.module.css";

const Avatar = ({ user }) => {
  return (
    <div className={styles.avatar}>
      {user ? (
        <>
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name} />
          ) : (
            <div className={styles.letter}>
              <span>{user?.name[0].toUpperCase()}</span>
            </div>
          )}
        </>
      ) : (
        <img src="https://ui-avatars.com/api" alt="avatar" />
      )}
    </div>
  );
};

export default Avatar;
