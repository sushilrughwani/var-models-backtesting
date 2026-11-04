import katex from "katex";
import { Fragment } from "react";

/**
 * Lightweight renderer for short strings (questions, flashcards, formula variables):
 * plain text with $...$ / $$...$$ KaTeX, **bold** and line breaks. Safe for client and server.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const chunks = (text ?? "").split(/(`[^`\n]+`)/g);
  return (
    <span className={className}>
      {chunks.map((chunk, ci) =>
        /^`[^`\n]+`$/.test(chunk) ? (
          <code key={ci} className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[0.9em]">
            {chunk.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={ci}>{renderMathChunk(chunk)}</Fragment>
        ),
      )}
    </span>
  );
}

function renderMathChunk(text: string) {
  const parts = splitMath(text);
  return (
    <>
      {parts.map((p, i) =>
        p.math ? (
          <span
            key={i}
            className={p.display ? "my-2 block overflow-x-auto" : undefined}
            dangerouslySetInnerHTML={{ __html: renderTex(p.value, p.display) }}
          />
        ) : (
          <Fragment key={i}>{renderPlain(p.value)}</Fragment>
        ),
      )}
    </>
  );
}

export function TeX({ tex, display = false, className }: { tex: string; display?: boolean; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: renderTex(tex, display) }} />;
}

function renderTex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore" });
  } catch {
    return tex;
  }
}

function renderPlain(s: string) {
  const lines = s.split("\n");
  return lines.map((line, li) => (
    <Fragment key={li}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((seg, si) =>
        /^\*\*[^*]+\*\*$/.test(seg) ? <strong key={si}>{seg.slice(2, -2)}</strong> : <Fragment key={si}>{seg}</Fragment>,
      )}
      {li < lines.length - 1 && <br />}
    </Fragment>
  ));
}

interface Part {
  value: string;
  math: boolean;
  display: boolean;
}

export function splitMath(s: string): Part[] {
  const out: Part[] = [];
  const re = /\$\$([\s\S]+?)\$\$|(?<!\\)\$([^$\n]+?)(?<!\\)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ value: s.slice(last, m.index).replace(/\\\$/g, "$"), math: false, display: false });
    if (m[1] !== undefined) out.push({ value: m[1], math: true, display: true });
    else out.push({ value: m[2], math: true, display: false });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ value: s.slice(last).replace(/\\\$/g, "$"), math: false, display: false });
  return out;
}
