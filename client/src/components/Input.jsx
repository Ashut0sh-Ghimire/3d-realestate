// Shared text input with label + error message.
// <Input label="Email" type="email" error={errors.email} value={email} onChange={...} />
export default function Input({ label, error, id, className = "", ...props }) {
  const inputId = id ?? props.name;
  return (
    <label htmlFor={inputId} className={`block ${className}`}>
      {label && <span className="mb-1 block text-sm font-medium">{label}</span>}
      <input
        id={inputId}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-primary"
        {...props}
      />
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
}
