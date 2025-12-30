import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

export interface ActionButtonProps {
  children: ReactNode;
  textPending?: string;
  isPending?: boolean;
}

export default function ActionButton({
  children,
  textPending,
  isPending,
}: ActionButtonProps) {
  return (
    <Button
      type="submit"
      className="
        w-full
      "
    >
      {isPending && textPending ? (
        <>
          <Spinner />
          {textPending}
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
