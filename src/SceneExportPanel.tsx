"use client";

import { useId, useMemo, useState } from "react";
import { exportSceneJson, exportSceneMarkdown } from "./exportScene";
import type { ShowcaseScene } from "./types";

export function SceneExportPanel({ scene }: { scene: ShowcaseScene }) {
  const headingId = useId();
  const [copied, setCopied] = useState(false);
  const json = useMemo(() => exportSceneJson(scene), [scene]);
  const md = useMemo(() => exportSceneMarkdown(scene), [scene]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const download = (text: string, name: string, type: string) => {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5 space-y-3"
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-sky-100">
        Export scene
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copy(json)}
          className="px-3 py-2 rounded-lg text-sm bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          {copied ? "Copied" : "Copy JSON"}
        </button>
        <button
          type="button"
          onClick={() => download(json, `${scene.id}.json`, "application/json")}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Download JSON
        </button>
        <button
          type="button"
          onClick={() => download(md, `${scene.id}.md`, "text/markdown")}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Download markdown
        </button>
      </div>
    </section>
  );
}
