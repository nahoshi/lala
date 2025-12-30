"use client";

import { authClient } from "@/lib/authClient";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { ReactNode, useTransition } from "react";

export interface SpotifyProps {
  children: ReactNode;
}

export default function SpotifyButton({ children }: SpotifyProps) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "spotify",
      });
    });
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="
        w-full
      "
    >
      {isPending ? (
        <>
          <Spinner />
          Entrando com spotify
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
