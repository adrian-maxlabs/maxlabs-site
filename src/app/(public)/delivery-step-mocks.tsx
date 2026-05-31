import {
  BarChart3,
  CheckCircle2,
  Circle,
  GitBranch,
  Layers,
  Rocket,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MockShellProps = {
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

function MockShell({ label, title, children, className }: MockShellProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-md shrink-0 flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[#0f172a] p-4 text-xs text-slate-300 shadow-xl sm:w-[28rem] sm:p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-sky-300">
            {label}
          </span>
          <span className="text-[0.625rem] text-slate-500">MAXLABS Delivery Console</span>
        </div>
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      {children}
    </div>
  );
}

export function DiscoverMock() {
  return (
    <MockShell label="Step 1" title="Discovery Workshop Brief">
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium text-slate-200">
            <Search className="size-3 text-sky-400" aria-hidden="true" />
            Current-state assessment
          </p>
          <ul className="space-y-1.5">
            {[
              "Map approval chains across departments",
              "Identify duplicate data entry points",
              "Document reporting delays and owners",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[0.6875rem] text-slate-400">
                <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Stakeholders", value: "6 mapped", icon: Users },
            { label: "Pain points", value: "11 flagged", icon: Circle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <Icon className="mb-1 size-3.5 text-sky-400" aria-hidden="true" />
              <p className="text-[0.625rem] text-slate-500">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-3">
          <p className="text-[0.625rem] uppercase tracking-wide text-sky-300">Success metric draft</p>
          <p className="mt-1 text-sm text-slate-200">Cut manual reconciliation time by 40% within 90 days.</p>
        </div>
      </div>
    </MockShell>
  );
}

export function DesignMock() {
  return (
    <MockShell label="Step 2" title="Solution Architecture Blueprint">
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium text-slate-200">
            <Layers className="size-3 text-sky-400" aria-hidden="true" />
            Module map
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {["CRM", "Billing", "Inventory", "Reports", "Admin", "API"].map((mod) => (
              <span
                key={mod}
                className="rounded-md border border-white/10 bg-[#1e293b] px-2 py-1 text-center text-[0.625rem] text-slate-300"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium text-slate-200">
            <Shield className="size-3 text-sky-400" aria-hidden="true" />
            Role access matrix
          </p>
          <div className="space-y-1">
            {[
              ["Supervisor", "Full branch visibility"],
              ["Office staff", "Records + transactions"],
              ["Field team", "Assigned tasks only"],
            ].map(([role, scope]) => (
              <div key={role} className="flex items-center justify-between gap-2 text-[0.6875rem]">
                <span className="text-slate-300">{role}</span>
                <span className="text-slate-500">{scope}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <GitBranch className="size-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-[0.6875rem] text-emerald-200">3 implementation phases approved</span>
        </div>
      </div>
    </MockShell>
  );
}

export function BuildMock() {
  const modules = [
    { name: "Member enrollment", progress: 100 },
    { name: "Payment workflows", progress: 78 },
    { name: "Role dashboards", progress: 52 },
    { name: "Reporting layer", progress: 24 },
  ];

  return (
    <MockShell label="Step 3" title="Milestone Delivery Board">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <span className="text-[0.6875rem] text-slate-400">Sprint 3 · Week 6</span>
          <span className="badge badge-sm border-0 bg-sky-500/20 text-sky-200">In progress</span>
        </div>
        <div className="space-y-2">
          {modules.map(({ name, progress }) => (
            <div key={name} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[0.6875rem] text-slate-200">{name}</span>
                <span className="text-[0.625rem] text-slate-500">{progress}%</span>
              </div>
              <progress className="progress progress-primary h-1.5 w-full" value={progress} max={100} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["12", "Tests passed"],
            ["4", "Modules live"],
            ["0", "Blockers"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="text-base font-bold text-white">{value}</p>
              <p className="text-[0.625rem] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

export function LaunchMock() {
  return (
    <MockShell label="Step 4" title="Go-Live Command Center">
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-[0.6875rem] font-medium text-slate-200">Deployment pipeline</p>
          <div className="flex items-center gap-1">
            {["Staging", "UAT", "Production"].map((stage, index) => (
              <div key={stage} className="flex flex-1 items-center gap-1">
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-[0.625rem] font-bold",
                    index < 3 ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-slate-500",
                  )}
                >
                  {index + 1}
                </span>
                <span className="text-[0.625rem] text-slate-400">{stage}</span>
                {index < 2 && <span className="mx-0.5 h-px flex-1 bg-emerald-500/40" />}
              </div>
            ))}
          </div>
        </div>
        <ul className="space-y-1.5">
          {[
            "Production environment verified",
            "User onboarding sessions scheduled",
            "Support runbook published",
            "Rollback plan documented",
          ].map((item, index) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.6875rem]"
            >
              {index < 3 ? (
                <CheckCircle2 className="size-3 shrink-0 text-emerald-400" aria-hidden="true" />
              ) : (
                <Circle className="size-3 shrink-0 text-amber-400" aria-hidden="true" />
              )}
              <span className={index < 3 ? "text-slate-300" : "text-slate-400"}>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <Rocket className="size-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-[0.6875rem] text-emerald-200">Launch window: Friday 6:00 PM PHT</span>
        </div>
      </div>
    </MockShell>
  );
}

export function OptimizeMock() {
  return (
    <MockShell label="Step 5" title="Continuous Improvement Dashboard">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Cycle time", value: "-32%", trend: "down" },
            { label: "Data accuracy", value: "+18%", trend: "up" },
            { label: "Adoption rate", value: "91%", trend: "up" },
            { label: "Open issues", value: "3", trend: "down" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <p className="text-[0.625rem] text-slate-500">{label}</p>
              <p className="text-lg font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-[0.6875rem] font-medium text-slate-200">
            <BarChart3 className="size-3 text-sky-400" aria-hidden="true" />
            Monthly improvement backlog
          </p>
          <div className="space-y-1.5">
            {[
              ["Automate renewal reminders", "High"],
              ["Add branch-level KPI export", "Medium"],
              ["Refine mobile field workflow", "Medium"],
            ].map(([item, priority]) => (
              <div key={item} className="flex items-center justify-between text-[0.6875rem]">
                <span className="text-slate-300">{item}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[0.625rem]",
                    priority === "High"
                      ? "bg-amber-500/20 text-amber-200"
                      : "bg-white/10 text-slate-400",
                  )}
                >
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

export const DELIVERY_STEP_MOCKS = {
  discover: DiscoverMock,
  design: DesignMock,
  build: BuildMock,
  launch: LaunchMock,
  optimize: OptimizeMock,
} as const;
