import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export interface PasswordInputProps {
  label: string;
  placeholder?: string;
  error?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  error,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  const toggleShow = (e: MouseEvent) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="grid gap-2">
      <Label className={error ? "text-destructive" : ""}>{label}</Label>
      <InputGroup className={error ? "border-destructive" : ""}>
        <InputGroupInput
          type={show ? "text" : "password"}
          placeholder={placeholder ?? ""}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          {show ? (
            <Eye onClick={toggleShow} className="size-4.5" />
          ) : (
            <EyeClosed onClick={toggleShow} className="size-4.5" />
          )}
        </InputGroupAddon>
      </InputGroup>
      {error && (
        <p className="text-sm font-medium text-destructive"> • {error}</p>
      )}
    </div>
  );
}
