// Shared loading spinner. Use while waiting for the API.
export default function Loader({ label = "Loading..." }) {
  return (
    <div role="status" className="flex items-center gap-3 text-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label}
    </div>
  );
}
