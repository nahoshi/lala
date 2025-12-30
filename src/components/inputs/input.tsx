import { Label } from "../ui/label";
import { Input as ShadcnInput } from "../ui/input";

export interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  error?: string;
}

export default function Input({
  label,
  type,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <div
      className="
        grid
        gap-2
      "
    >
      <Label
        className={`
          ${error && "text-destructive"}
        `}
      >
        {label}
      </Label>
      <ShadcnInput
        type={type}
        placeholder={placeholder ?? ""}
        className={`
          ${error && "border-destructive"}
        `}
        {...props}
      />
      {error && (
        <p
          className="
            text-sm font-medium text-destructive
          "
        >
          {" "}
          • {error}
        </p>
      )}
    </div>
  );
}
