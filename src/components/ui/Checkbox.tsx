import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: Props) {
  return (
    <input
      type="checkbox"
      className={twMerge(clsx("ui-checkbox", className))}
      {...props}
    />
  );
}

export default Checkbox;
