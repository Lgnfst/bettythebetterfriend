export function Input({ className = "", ...props }) {
  return <input className={`px-3 py-2 border ${className}`} {...props} />;
}
export default Input;

