function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled, className = '', ...props }) {
  const baseClass = `btn btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const classes = `${baseClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
