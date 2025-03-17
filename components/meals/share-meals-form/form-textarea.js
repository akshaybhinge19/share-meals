import classes from "./form-field.module.css";

const FormTextArea = ({ label, id, rows, register, errors, required, className = '' }) => (
  <p>
    <label htmlFor={id} aria-required={required}>
      {label}
      {required && <span className={classes.required}> *</span>}
    </label>
    <textarea id={id} rows={rows} {...register(id, { required })} className={className === 'instructions' ? classes.instructions : className}/>
    {errors[id] && (
      <span className={classes.required}>{label} is required</span>
    )}
  </p>
);

export default FormTextArea;
