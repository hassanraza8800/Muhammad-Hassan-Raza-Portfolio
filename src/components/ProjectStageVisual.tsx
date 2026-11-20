import { useState } from 'react';
import { ArrowUpRight, Check, Minus, Plus, Smartphone } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectStageVisualProps {
  projectId: ProjectItem['id'];
  compact?: boolean;
}

export function ProjectStageVisual({ projectId, compact = false }: ProjectStageVisualProps) {
  switch (projectId) {
    case 'cowgenic':
      return <CowgenicStage compact={compact} />;
    case 'salt-ranges':
      return <SaltRangesStage compact={compact} />;
    case 'growst':
      return <GrowstStage compact={compact} />;
    case 'flame-grilled':
      return <FlameGrilledStage compact={compact} />;
    case 'demo-restaurant':
      return <DemoRestaurantStage compact={compact} />;
  }
}

function CowgenicStage({ compact }: { compact: boolean }) {
  const [moduleTab, setModuleTab] = useState<'stock' | 'milk' | 'parties'>('stock');

  const stockRows = [
    { item: 'Animal Feed Stock', detail: 'Silage · Concentrate', value: '18.4 tons', status: 'In Stock' },
    { item: 'Semen Inventory', detail: 'Holstein · Jersey straws', value: '420 doses', status: 'Verified' },
    { item: 'Vaccination Stock', detail: 'FMD · HS · Brucella', value: '165 vials', status: 'Scheduled' },
  ];

  const milkRows = [
    { item: 'Morning Milking', detail: 'Batch A · 142 cattle', value: '940 L', status: 'Logged' },
    { item: 'Evening Milking', detail: 'Batch B · 140 cattle', value: '850 L', status: 'Logged' },
    { item: 'Dispatched to Buyers', detail: 'Chilled tank delivery', value: '1,710 L', status: 'Invoiced' },
  ];

  const partyRows = [
    { item: 'Customer Management', detail: 'Dairy buyers & daily routes', value: '38 active', status: 'Billing' },
    { item: 'Supplier Management', detail: 'Feed, semen & vet vendors', value: '19 vendors', status: 'Synced' },
    { item: 'Purchase & Sales Ledger', detail: 'Receivables & restock POs', value: 'Up to date', status: 'Balanced' },
  ];

  const activeRows =
    moduleTab === 'stock' ? stockRows : moduleTab === 'milk' ? milkRows : partyRows;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#101614] p-4 sm:p-5 text-white border border-white/10 select-none">
      {/* Top chrome & module switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
        <span className="font-mono text-[11px] text-emerald-400 tracking-tight truncate">
          dfmscowgenic.com/management
        </span>
        <div className="flex items-center gap-1 rounded-md bg-white/5 p-0.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModuleTab('stock');
            }}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
              moduleTab === 'stock' ? 'bg-emerald-500 text-[#07140E]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Stock
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModuleTab('milk');
            }}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
              moduleTab === 'milk' ? 'bg-emerald-500 text-[#07140E]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Milk
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModuleTab('parties');
            }}
            className={`px-2 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
              moduleTab === 'parties' ? 'bg-emerald-500 text-[#07140E]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Accounts
          </button>
        </div>
      </div>

      {/* Main DFMS module layout */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-4 rounded-lg bg-[#161F1B] p-3.5 border border-white/5 flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-zinc-400">Cowgenic DFMS</p>
            <p className="font-display text-base sm:text-lg font-semibold text-white mt-0.5 leading-snug">
              Farm Management
            </p>
          </div>
          <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-zinc-400 truncate">Milk Output</span>
              <span className="font-mono text-xs text-emerald-300 tabular-nums shrink-0">1,790 L</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-zinc-400 truncate">Semen Stock</span>
              <span className="font-mono text-xs text-white tabular-nums shrink-0">420 doses</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-zinc-400 truncate">Vaccines</span>
              <span className="font-mono text-xs text-zinc-300 tabular-nums shrink-0">165 vials</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 rounded-lg bg-[#161F1B] p-3.5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium text-zinc-200 truncate">
              {moduleTab === 'stock'
                ? 'Feed, Semen & Vaccination Stock'
                : moduleTab === 'milk'
                  ? 'Daily Milk Production Ledger'
                  : 'Customers & Suppliers'}
            </span>
            <span className="font-mono text-[10px] text-emerald-400 shrink-0">DFMS Core</span>
          </div>

          <div className="space-y-2">
            {activeRows.slice(0, compact ? 2 : 3).map((row) => (
              <div
                key={row.item}
                className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] px-3 py-2 border border-white/5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{row.item}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{row.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-xs text-emerald-300 tabular-nums whitespace-nowrap">
                    {row.value}
                  </p>
                  <p className="font-mono text-[10px] text-zinc-500 whitespace-nowrap">
                    {row.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 grid grid-cols-3 gap-2.5 text-[11px]">
          <div className="rounded-lg bg-white/[0.03] px-3 py-2 border border-white/5 flex items-center justify-between gap-2">
            <span className="text-zinc-400 truncate">Feed &amp; Semen</span>
            <span className="font-mono text-emerald-300 shrink-0">Tracked</span>
          </div>
          <div className="rounded-lg bg-white/[0.03] px-3 py-2 border border-white/5 flex items-center justify-between gap-2">
            <span className="text-zinc-400 truncate">Customers</span>
            <span className="font-mono text-zinc-200 shrink-0">Active</span>
          </div>
          <div className="rounded-lg bg-white/[0.03] px-3 py-2 border border-white/5 flex items-center justify-between gap-2">
            <span className="text-zinc-400 truncate">Suppliers</span>
            <span className="font-mono text-zinc-200 shrink-0">Managed</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SaltRangesStage({ compact }: { compact: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#F4F1EA] p-4 sm:p-5 text-[#171614] border border-black/10 select-none">
      <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
        <span className="font-mono text-[11px] text-[#5E5B52] truncate">
          https://salt-ranges.com
        </span>
        <span className="font-mono text-[10px] text-[#8A8579] whitespace-nowrap">
          Production · Vercel Edge
        </span>
      </div>

      <div className="rounded-lg bg-white p-4 sm:p-5 border border-black/8 shadow-[0_8px_24px_rgba(17,18,22,0.05)]">
        <div className="flex items-center justify-between border-b border-black/8 pb-3 mb-4">
          <span className="font-serif italic text-base font-medium tracking-tight text-[#171614]">
            Salt Ranges
          </span>
          <div className="flex items-center gap-3 text-[10px] text-[#5E5B52]">
            <span>Overview</span>
            <span>Solutions</span>
            <span>Contact</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-7 space-y-2">
            <p className="font-mono text-[10px] text-[#857A66]">Client Production Launch</p>
            <h4 className="font-display text-lg sm:text-xl font-bold leading-tight text-[#171614]">
              Structured Presence. Global Reach.
            </h4>
            <p className="text-[11px] leading-relaxed text-[#5E5B52]">
              Custom-engineered responsive web experience transitioning cleanly from Vercel staging to custom domain deployment.
            </p>
          </div>
          <div className="col-span-5">
            <div className="rounded-lg bg-[#1A1C22] p-3.5 text-white space-y-2.5">
              <div className="h-1.5 w-10 rounded-full bg-[#C8A96E]" />
              <p className="font-serif italic text-xs text-zinc-200 leading-snug">
                Editorial clarity engineered for rapid global page delivery.
              </p>
              <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>salt-ranges.com</span>
                <ArrowUpRight className="w-3 h-3 text-[#C8A96E]" />
              </div>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="mt-4 pt-3 border-t border-black/8 grid grid-cols-3 gap-3 text-[10px]">
            <div>
              <p className="text-[#857A66] font-mono">Staging</p>
              <p className="font-medium text-[#171614] truncate">salt-ranges.vercel.app</p>
            </div>
            <div>
              <p className="text-[#857A66] font-mono">Production</p>
              <p className="font-medium text-[#171614] truncate">salt-ranges.com</p>
            </div>
            <div>
              <p className="text-[#857A66] font-mono">Architecture</p>
              <p className="font-medium text-[#171614]">Responsive · SEO</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GrowstStage({ compact }: { compact: boolean }) {
  const [doneSteps, setDoneSteps] = useState<number[]>([0]);

  const toggleStep = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDoneSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const habits = ['Summarize core chapter thesis', 'Apply 1 action prompt today', 'Track 7-day streak'];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#131520] p-4 sm:p-5 text-white border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <span className="font-mono text-[11px] text-blue-300">growst.co · Google Play App</span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-400">
          <Smartphone className="w-3 h-3" /> Web + Android
        </span>
      </div>

      <div className="grid grid-cols-12 gap-3.5 items-stretch">
        <div className="col-span-12 sm:col-span-7 rounded-lg bg-[#1B1F30] p-4 border border-white/8 flex flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] text-blue-400">Growst Web Platform</p>
            <h4 className="font-display text-lg font-bold text-white mt-1 leading-tight">
              Books into Action.
            </h4>
            <p className="text-[11px] text-zinc-300 mt-1.5 leading-relaxed">
              Structured book distillations paired with guided behavioral action loops across web and Android.
            </p>
          </div>
          {!compact && (
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px]">
              <div className="rounded bg-white/5 px-2.5 py-2">
                <p className="text-zinc-400">Web Surface</p>
                <p className="font-medium text-white mt-0.5">growst.co</p>
              </div>
              <div className="rounded bg-white/5 px-2.5 py-2">
                <p className="text-zinc-400">Distribution</p>
                <p className="font-medium text-white mt-0.5">Google Play Store</p>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 sm:col-span-5 rounded-2xl bg-[#0B0D14] p-3 border border-white/15 flex flex-col justify-between">
          <div>
            <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-white/20" />
            <p className="text-[10px] font-mono text-zinc-400">Daily Action Card</p>
            <p className="font-display text-xs font-semibold text-white mt-0.5">
              Interactive Checklist
            </p>
            <div className="mt-2.5 space-y-1.5">
              {habits.map((item, idx) => {
                const checked = doneSteps.includes(idx);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={(e) => toggleStep(idx, e)}
                    className={`w-full text-left flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] transition-colors cursor-pointer ${
                      checked
                        ? 'bg-blue-600/25 text-blue-100 border border-blue-500/40'
                        : 'bg-white/5 text-zinc-300 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                        checked ? 'bg-blue-500 text-white' : 'border border-zinc-500'
                      }`}
                    >
                      {checked && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span className="truncate">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400 tabular-nums">
            <span>Progress</span>
            <span className="text-blue-300">
              {doneSteps.length}/{habits.length} done
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlameGrilledStage({ compact }: { compact: boolean }) {
  const specials = [
    { name: 'Charred Smash Double', note: 'Open flame · House glaze', price: '$14' },
    { name: 'Smoked Peri Skewer', note: 'Wood-fired · Herb flatbread', price: '$16' },
    { name: 'Ember Street Fries', note: 'Chili oil · Roasted garlic', price: '$8' },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#16110E] p-4 sm:p-5 text-[#F8F3EC] border border-orange-500/20 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <span className="font-mono text-[11px] text-amber-400 truncate">
          flame-grilled-street-kitchen.vercel.app
        </span>
        <span className="font-mono text-[10px] text-zinc-400 shrink-0">Live-Fire Concept</span>
      </div>

      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12 sm:col-span-5 space-y-2">
          <p className="font-mono text-[10px] text-orange-400">Street Kitchen</p>
          <h4 className="font-display text-xl font-extrabold tracking-tight leading-none text-white">
            Smoke. Char. Craft.
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Bold culinary typography and appetite-first menu pacing engineered for instant mobile browsing.
          </p>
        </div>

        <div className="col-span-12 sm:col-span-7 space-y-2">
          {specials.slice(0, compact ? 2 : 3).map((dish) => (
            <div
              key={dish.name}
              className="flex items-center justify-between rounded-lg bg-[#221914] px-3 py-2.5 border border-white/5"
            >
              <div className="min-w-0 pr-2">
                <p className="font-display text-xs font-semibold text-white truncate">{dish.name}</p>
                <p className="text-[10px] text-zinc-400 truncate">{dish.note}</p>
              </div>
              <span className="font-mono text-xs font-medium text-amber-400 tabular-nums shrink-0">
                {dish.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoRestaurantStage({ compact }: { compact: boolean }) {
  const [counts, setCounts] = useState<Record<string, number>>({
    'Artisan Biryani': 1,
    'Karahi Platter': 1,
  });

  const menu = [
    { name: 'Artisan Biryani', price: 12 },
    { name: 'Karahi Platter', price: 18 },
    { name: 'Mint Cooler', price: 4 },
  ];

  const adjust = (name: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts((prev) => ({
      ...prev,
      [name]: Math.max(0, (prev[name] || 0) + delta),
    }));
  };

  const total = menu.reduce((acc, item) => acc + item.price * (counts[item.name] || 0), 0);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#FAF8F5] p-4 sm:p-5 text-[#18181B] border border-black/10 select-none">
      <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
        <span className="font-mono text-[11px] text-zinc-600 truncate">
          demo-resturent-app-001.vercel.app
        </span>
        <span className="font-mono text-[10px] text-zinc-500 shrink-0">Interactive Cart Demo</span>
      </div>

      <div className="space-y-2">
        {menu.slice(0, compact ? 2 : 3).map((item) => {
          const qty = counts[item.name] || 0;
          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg bg-white px-3.5 py-2.5 border border-black/8"
            >
              <div>
                <p className="font-display text-xs font-semibold text-[#18181B]">{item.name}</p>
                <p className="font-mono text-[11px] text-zinc-500 tabular-nums">${item.price}.00</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={(e) => adjust(item.name, -1, e)}
                  className="w-6 h-6 rounded border border-black/15 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono text-xs w-4 text-center tabular-nums">{qty}</span>
                <button
                  type="button"
                  aria-label={`Add ${item.name}`}
                  onClick={(e) => adjust(item.name, 1, e)}
                  className="w-6 h-6 rounded bg-[#18181B] text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 rounded-lg bg-[#18181B] text-white px-3.5 py-2.5 flex items-center justify-between">
        <span className="text-[11px] text-zinc-300">Live Order Preview</span>
        <span className="font-mono text-xs font-medium tabular-nums">${total}.00</span>
      </div>
    </div>
  );
}
