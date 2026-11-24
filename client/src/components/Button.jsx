// Shared button. Use this instead of styling <button> on every page.
// <Button>Save</Button>   <Button variant="secondary">Cancel</Button>
const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-surface text-text border border-border hover:bg-background",
  danger: "bg-danger text-white hover:opacity-90",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 font-medium transition disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
