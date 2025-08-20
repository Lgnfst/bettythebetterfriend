export function Button({ className = "", ...props }) {
  return <button className={`px-4 py-2 ${className}`} {...props} />;
}
export default Button;

