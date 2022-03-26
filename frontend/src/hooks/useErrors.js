import { useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (!errorAlreadyExists) {
      setErrors((prev) => [...prev, { field, message }]);
    }
  }

  function removeError(field) {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
