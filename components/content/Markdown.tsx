import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/cn";

/** Renders Markdown with GitHub-flavoured extensions and KaTeX math ($...$ and $$...$$). */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose prose-fa max-w-none prose-headings:scroll-mt-24 prose-pre:overflow-x-auto", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[[rehypeKatex, { strict: "ignore", throwOnError: false }]]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
