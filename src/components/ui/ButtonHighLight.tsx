import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children="MOA", ...props }: Props) {
  return (
    <button
      className={twMerge(clsx("button-highlight w-full h-12 rounded-lg", className))}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;