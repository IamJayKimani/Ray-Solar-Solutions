function Input({ label, id, error, type = 'text', className = '', ...props }) {
  return (
    <div className={`form-field ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Input;
