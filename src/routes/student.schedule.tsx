import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { useState } from "react";
import { AppLayout, Card } from "@/components/AppLayout";
import { SCHEDULE } from "@/lib/mock-data";

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const HOURS = Array.from({ length: 14 }, (_, i) => 7 + i);

export const Route = createFileRoute("/student/schedule")({
  component: SchedulePage,
});

function SchedulePage() {
  const [view, setView] = useState<"week" | "list">("week");
  return (
    <AppLayout role="student" title="Mi Horario">
      <div className="mb-4 flex justify-end gap-2">
        <button onClick={() => setView("week")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${view === "week" ? "bg-navy text-white" : "bg-muted"}`}>Semanal</button>
        <button onClick={() => setView("list")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${view === "list" ? "bg-navy text-white" : "bg-muted"}`}>Lista</button>
      </div>
      <Card>
        {view === "week" ? (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[60px_repeat(6,1fr)] gap-1 min-w-[700px]">
              <div />
              {DAYS.map((d) => <div key={d} className="text-center text-xs font-bold py-2 bg-muted rounded">{d}</div>)}
              {HOURS.map((h) => (
                <Fragment key={`row-${h}`}>
                  <div className="text-xs text-muted-foreground text-right pr-2 py-1 font-mono">{h}:00</div>
                  {[1, 2, 3, 4, 5, 6].map((day) => {
                    const block = SCHEDULE.find((s) => s.days.includes(day) && s.start === h);
                    if (block) {
                      const span = block.end - block.start;
                      return (
                        <div key={`${day}-${h}`} className={`${block.color} text-white text-xs rounded p-2`} style={{ gridRow: `span ${span}` }}>
                          <div className="font-bold">{block.course}</div>
                          <div className="opacity-90">Aula {block.room}</div>
                        </div>
                      );
                    }
                    const inUse = SCHEDULE.some((s) => s.days.includes(day) && h > s.start && h < s.end);
                    if (inUse) return null;
                    return <div key={`${day}-${h}`} className="border border-dashed border-border/50 rounded min-h-[40px]" />;
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <ul className="divide-y">
            {SCHEDULE.map((s) => (
              <li key={s.code} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{s.course}</div>
                  <div className="text-xs text-muted-foreground">Aula {s.room} — {s.days.map((d) => DAYS[d - 1]).join(", ")}</div>
                </div>
                <div className="text-sm font-mono">{s.start}:00 - {s.end}:00</div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AppLayout>
  );
}
