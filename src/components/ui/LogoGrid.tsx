import Image from "next/image";
import { clientLogos } from "@/data/content";

export function LogoGrid() {
  // Duplicated once so the track can translate exactly -50% and loop with
  // no visible seam — the browser never sees the reset happen.
  const track = [...clientLogos, ...clientLogos];

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-12 group-hover:[animation-play-state:paused] sm:gap-16">
        {track.map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl p-2 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md sm:h-24 sm:w-52"
            style={{ background: "#ffffff" }}
            aria-hidden={i >= clientLogos.length}
          >
            <Image
              src={client.src}
              alt={client.name}
              width={200}
              height={133}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
