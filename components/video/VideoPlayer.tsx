import { Clock, PlayCircle } from "lucide-react";
import type { VideoProvider } from "@/lib/data/types";

/**
 * Provider-agnostic lecture player.
 *
 * Until lectures are recorded every lesson shows a styled "coming soon" placeholder.
 * INTEGRATION: implement secure playback per provider. Recommended: a private-video host
 * (Bunny Stream, Mux, Cloudflare Stream, Vimeo OTT/VdoCipher for DRM) with short-lived signed
 * playback URLs/tokens generated server-side ONLY for enrolled students, domain restriction,
 * and dynamic watermarking with the student's email. Never embed public YouTube links for paid lessons.
 */
export function VideoPlayer({
  provider = "none",
  videoId,
  title,
  duration,
}: {
  provider?: VideoProvider;
  videoId?: string;
  title: string;
  duration: number;
}) {
  if (provider !== "none" && videoId) {
    // INTEGRATION: request a signed playback URL from the server (e.g. GET /api/video-token?lesson=…)
    const src = embedUrl(provider, videoId);
    if (src) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black">
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      );
    }
  }
  return (
    <div
      className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border text-white"
      style={{ background: "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--c-primary) 70%, #000), #0b1220 70%)" }}
      role="img"
      aria-label={`Lecture video coming soon: ${title}, about ${duration} minutes`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden>
        <path d="M0 70 L20 60 L40 64 L60 44 L80 50 L100 30 L120 36 L160 14" fill="none" stroke="#fff" strokeWidth="1" />
      </svg>
      <PlayCircle className="relative h-14 w-14 opacity-90" aria-hidden />
      <p className="relative mt-3 text-lg font-semibold">Lecture video coming soon</p>
      <p className="relative mt-1 max-w-md px-6 text-center text-sm text-white/75">{title}</p>
      <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
        <Clock className="h-3.5 w-3.5" aria-hidden /> {duration} min
      </span>
    </div>
  );
}

function embedUrl(provider: VideoProvider, id: string): string | null {
  switch (provider) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    case "vimeo":
      return `https://player.vimeo.com/video/${encodeURIComponent(id)}`;
    case "bunny":
      return `https://iframe.mediadelivery.net/embed/${id}`; // INTEGRATION: "<libraryId>/<videoId>" + token params
    case "cloudflare":
      return `https://iframe.videodelivery.net/${encodeURIComponent(id)}`; // INTEGRATION: use signed token instead of id
    case "mux":
      return null; // INTEGRATION: use @mux/mux-player-react with a signed playback token
    default:
      return null;
  }
}
