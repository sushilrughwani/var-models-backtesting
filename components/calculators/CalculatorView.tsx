"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { defaultValues, getCalculator } from "@/lib/calculators/registry";
import type { CalcOutput, CalcValues } from "@/lib/calculators/types";
import { TeX, MathText } from "@/components/content/MathText";
import { Input, Label, Select, Textarea, FieldHint } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Section";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/Table";
import { cn } from "@/lib/cn";

function fmt(o: CalcOutput): string {
  if (typeof o.value === "string") return o.value;
  const d = o.decimals ?? (o.format === "integer" ? 0 : o.format === "percent" ? 2 : 4);
  if (o.format === "percent") return `${(o.value * 100).toFixed(d)}%`;
  if (o.format === "integer") return Math.round(o.value).toLocaleString("en-US");
  return o.value.toLocaleString("en-US", { minimumFractionDigits: o.format === "currency" ? 2 : 0, maximumFractionDigits: o.format === "currency" ? 2 : d });
}

const PALETTE = ["var(--c-primary)", "var(--c-accent)", "var(--c-highlight)", "var(--c-danger)"];

export function CalculatorView({ slug }: { slug: string }) {
  const def = getCalculator(slug);
  const [values, setValues] = useState<CalcValues>(() => (def ? defaultValues(def) : {}));
  const result = useMemo(() => {
    if (!def) return null;
    try {
      return def.compute(values);
    } catch (e) {
      return { outputs: [], error: (e as Error).message };
    }
  }, [def, values]);
  if (!def || !result) return <Callout tone="danger">Calculator not found.</Callout>;
  const set = (k: string, v: string, numeric: boolean) => setValues((s) => ({ ...s, [k]: numeric ? (v === "" ? NaN : Number(v)) : v }));

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-5 text-center">
        <TeX tex={def.formula} display />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <form className="space-y-4 rounded-2xl border border-border bg-surface p-5" onSubmit={(e) => e.preventDefault()} aria-label="Inputs">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Inputs</h2>
            <Button size="sm" variant="ghost" onClick={() => setValues(defaultValues(def))}><RotateCcw className="h-3.5 w-3.5" /> Reset</Button>
          </div>
          {def.inputs.map((inp) => {
            const id = `in-${inp.key}`;
            const v = values[inp.key];
            return (
              <div key={inp.key}>
                <Label htmlFor={id}>{inp.label}</Label>
                {inp.type === "select" ? (
                  <Select id={id} value={String(v)} onChange={(e) => set(inp.key, e.target.value, false)}>
                    {inp.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </Select>
                ) : inp.type === "series" ? (
                  <Textarea id={id} rows={3} value={String(v)} onChange={(e) => set(inp.key, e.target.value, false)} className="font-mono text-xs" />
                ) : (
                  <div className="relative">
                    {inp.prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">{inp.prefix}</span>}
                    <Input
                      id={id}
                      type="number"
                      inputMode="decimal"
                      step={inp.step ?? (inp.type === "integer" ? 1 : "any")}
                      min={inp.min}
                      max={inp.max}
                      value={Number.isNaN(v as number) ? "" : String(v)}
                      onChange={(e) => set(inp.key, e.target.value, true)}
                      className={cn(inp.prefix && "pl-8", inp.suffix && "pr-10")}
                    />
                    {inp.suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">{inp.suffix}</span>}
                  </div>
                )}
                {inp.help && <FieldHint>{inp.help}</FieldHint>}
              </div>
            );
          })}
        </form>
        <div className="space-y-6" aria-live="polite">
          {result.error ? (
            <Callout tone="warning" title="Check your inputs">{result.error}</Callout>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {result.outputs.map((o) => (
                <div key={o.label} className={cn("rounded-xl border p-4", o.highlight ? "border-primary bg-primary/5" : "border-border bg-surface")}>
                  <p className="text-sm text-muted">{o.label}</p>
                  <p className={cn("mt-1 font-bold tracking-tight", o.highlight ? "text-2xl text-primary" : "text-xl")}>{fmt(o)}</p>
                </div>
              ))}
            </div>
          )}
          {!result.error && result.chart && result.chart.data.length > 0 && (
            <div className="rounded-2xl border border-border bg-surface p-4">
              {result.chart.title && <p className="mb-2 text-sm font-semibold">{result.chart.title}</p>}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {result.chart.type === "bar" ? (
                    <BarChart data={result.chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                      <XAxis dataKey={result.chart.xKey} tick={{ fontSize: 11, fill: "var(--c-muted)" }} />
                      <YAxis tick={{ fontSize: 11, fill: "var(--c-muted)" }} />
                      <Tooltip contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }} />
                      {result.chart.yKeys.map((k, i) => <Bar key={k} dataKey={k} fill={PALETTE[i % PALETTE.length]} />)}
                    </BarChart>
                  ) : (
                    <LineChart data={result.chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--c-border)" />
                      <XAxis dataKey={result.chart.xKey} tick={{ fontSize: 11, fill: "var(--c-muted)" }} />
                      <YAxis tick={{ fontSize: 11, fill: "var(--c-muted)" }} />
                      <Tooltip contentStyle={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }} />
                      {result.chart.yKeys.map((k, i) => <Line key={k} dataKey={k} stroke={PALETTE[i % PALETTE.length]} dot={false} strokeWidth={2} />)}
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {!result.error && result.table && (
            <div>
              {result.table.title && <p className="mb-2 text-sm font-semibold">{result.table.title}</p>}
              <div className="max-h-96 overflow-auto">
                <Table>
                  <THead><TR>{result.table.columns.map((c) => <TH key={c}>{c}</TH>)}</TR></THead>
                  <TBody>
                    {result.table.rows.map((row, i) => (
                      <TR key={i}>{row.map((cell, j) => <TD key={j} className="tabular-nums">{typeof cell === "number" ? cell.toLocaleString("en-US", { maximumFractionDigits: 4 }) : cell}</TD>)}</TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            </div>
          )}
          {!result.error && result.notes && result.notes.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted">{result.notes.map((n) => <li key={n}><MathText text={n} /></li>)}</ul>
          )}
        </div>
      </div>
    </div>
  );
}
