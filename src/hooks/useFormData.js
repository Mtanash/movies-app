import { useCallback, useState } from "react";

const INITIAL_FORM_DATA = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useFormData = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleFormDataChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  return { formData, handleFormDataChange };
};

export default useFormData;
