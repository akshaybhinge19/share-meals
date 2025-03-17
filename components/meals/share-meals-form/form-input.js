import classes from "./form-field.module.css";

const FormInput = ({ label, id, type, register, errors, required }) => (
  <p>
    <label htmlFor={id} aria-required={required}>
      {label} {required && <span className={classes.required}>*</span>}
    </label>
    <input
      type={type}
      id={id}
      {...register(id, { required })}
    />
    {errors[id] && <span className={classes.required}>{label} is required</span>}
  </p>
);

export default FormInput;
