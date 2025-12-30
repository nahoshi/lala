import type { PlaylistedTrack, Track } from "@spotify/web-api-ts-sdk";
import { Marquee } from "../ui/marquee";
import Image from "next/image";

export interface AuthBackgroundProps {
  tracks: PlaylistedTrack<Track>[];
}

export default function AuthBackground({ tracks }: AuthBackgroundProps) {
  const limitedTracks = tracks.slice(0, 50);

  const columns = [0, 1, 2, 3, 4].map((i) =>
    limitedTracks.slice(
      Math.floor(i * (limitedTracks.length / 5)),
      Math.floor((i + 1) * (limitedTracks.length / 5))
    )
  );

  return (
    <div
      className="
        flex flex-row overflow-hidden
        h-full w-full
        absolute -z-10 items-center justify-center gap-2 perspective-normal
        md:justify-end
      "
    >
      <div
        className="
          flex flex-row
          items-center gap-2
          md:translate-z-[-15] md:rotate-z-[-50deg]
        "
      >
        {columns.map((tracks, index) => (
          <Marquee
            key={index}
            pauseOnHover
            vertical
            reverse={index % 2 === 0}
            className="
              [--duration:80s]
            "
          >
            {tracks.map(
              (track) =>
                track.track.album.images[0].url && (
                  <Image
                    key={track.track.id}
                    src={track.track.album.images[0].url}
                    alt={`album cover of music: ${track.track.name}`}
                    height={track.track.album.images[0].height}
                    width={track.track.album.images[0].width}
                    className="
                      md:max-w-64
                    "
                  />
                )
            )}
          </Marquee>
        ))}
      </div>
      <div
        className="
          z-10
          bg-black/60
          absolute inset-0
        "
      />
      <div
        className="
          h-1/4
          from-background bg-linear-to-b
          pointer-events-none
          absolute inset-x-0 top-0
        "
      ></div>
      <div
        className="
          h-1/4
          from-background bg-linear-to-t
          pointer-events-none
          absolute inset-x-0 bottom-0
        "
      ></div>
      <div
        className="
          w-1/4
          from-background bg-linear-to-r
          pointer-events-none
          absolute inset-y-0 left-0
        "
      ></div>
      <div
        className="
          w-1/4
          from-background bg-linear-to-l
          pointer-events-none
          absolute inset-y-0 right-0
        "
      ></div>
    </div>
  );
}
