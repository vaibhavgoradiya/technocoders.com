import React, { useState } from 'react';
import './PremiumForm.css';

/**
 * Premium Input with Floating Label
 */
export const FloatingInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  required = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="floating-input-container">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`floating-input ${error ? 'error' : ''} ${hasValue || isFocused ? 'has-value' : ''}`}
        required={required}
        {...props}
      />
      <label className={`floating-label ${hasValue || isFocused ? 'active' : ''}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

/**
 * Premium Textarea with Floating Label
 */
export const FloatingTextarea = ({ 
  label, 
  value, 
  onChange, 
  error,
  required = false,
  rows = 4,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="floating-input-container">
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`floating-input floating-textarea ${error ? 'error' : ''} ${hasValue || isFocused ? 'has-value' : ''}`}
        required={required}
        rows={rows}
        {...props}
      />
      <label className={`floating-label ${hasValue || isFocused ? 'active' : ''}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

/**
 * Premium Select with Floating Label
 */
export const FloatingSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  error,
  required = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="floating-input-container">
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`floating-input floating-select ${error ? 'error' : ''} ${hasValue || isFocused ? 'has-value' : ''}`}
        required={required}
        {...props}
      >
        <option value=""></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className={`floating-label ${hasValue || isFocused ? 'active' : ''}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

/**
 * Premium Checkbox
 */
export const PremiumCheckbox = ({ label, checked, onChange, ...props }) => {
  return (
    <label className="premium-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="checkbox-custom"></span>
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

/**
 * Premium Radio Button
 */
export const PremiumRadio = ({ label, checked, onChange, name, value, ...props }) => {
  return (
    <label className="premium-radio">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className="radio-custom"></span>
      <span className="radio-label">{label}</span>
    </label>
  );
};

/**
 * Form Validation Hook
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    if (rules.required && !value) {
      return rules.requiredMessage || 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || 'Invalid format';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return '';
  };

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    if (touched[fieldName]) {
      const error = validate(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (fieldName) => () => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validate(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      if (error) newErrors[fieldName] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues
  };
};

export default {
  FloatingInput,
  FloatingTextarea,
  FloatingSelect,
  PremiumCheckbox,
  PremiumRadio,
  useFormValidation
};