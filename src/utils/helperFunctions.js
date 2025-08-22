 export const validateUserInput = (data) => {
    const errors = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (data.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.length > 150) {
      errors.name = "Name cannot exceed 150 characters";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (data.phone && !/^\+?\d{10,15}$/.test(data.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(data.password)
    ) {
      errors.password =
        "Password must contain uppercase, lowercase, number, and special character";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!data.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\+?\d{10,15}$/.test(data.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    return errors;
  };