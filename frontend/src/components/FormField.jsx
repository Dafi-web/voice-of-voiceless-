export default function FormField({
  id,
  label,
  type = 'text',
  required = false,
  hint,
  children,
  ...props
}) {
  if (children) {
    return (
      <div className="form-field">
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required"> (required)</span>}
        </label>
        {hint && <p className="form-field__hint">{hint}</p>}
        {children}
      </div>
    )
  }

  const Input = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && <span className="form-field__required"> (required)</span>}
      </label>
      {hint && <p className="form-field__hint">{hint}</p>}
      <Input
        id={id}
        name={id}
        className="form-field__input"
        required={required}
        type={type !== 'textarea' ? type : undefined}
        {...props}
      />
    </div>
  )
}
