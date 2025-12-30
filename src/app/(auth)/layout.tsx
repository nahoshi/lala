import AuthBackground from "@/components/auth/background";
import Toaster from "@/components/toaster";
import { spotify } from "@/lib/server/spotify";
import type { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const playlist = await spotify.playlists.getPlaylist(
    process.env.SPOTIFY_PLAYLIST_LOGIN_BACKGROUND!
  );

  return (
    <main
      className="
    h-dvh w-full max-w-screen flex items-end flex-col-reverse
    md:justify-start md:flex-row  "
    >
      <Toaster />
      <AuthBackground tracks={playlist.tracks.items} />
      {children}
    </main>
  );
}
