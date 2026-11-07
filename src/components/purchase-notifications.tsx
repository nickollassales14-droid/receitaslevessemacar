import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import { getPurchaseNotices } from "@/lib/purchases.functions";
import { notificationDelay, NOTIFICATION_DURATION, notificationsAllowed, selectNotice, type PurchaseNotice } from "@/lib/purchase-notifications";

export function PurchaseNotifications() {
  const fetchNotices = useServerFn(getPurchaseNotices);
  const [notice, setNotice] = useState<PurchaseNotice | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const seen = new Set<string>();
    let previousBuyer: string | undefined;
    const schedule = () => { timer = setTimeout(check, notificationDelay()); };
    const check = async () => {
      if (stopped) return;
      if (document.visibilityState !== "visible" || !notificationsAllowed(window.location.pathname)) { schedule(); return; }
      try {
        const notices = await fetchNotices();
        if (stopped) return;
        const next = selectNotice(notices, seen, previousBuyer);
        if (!next || document.visibilityState !== "visible" || !notificationsAllowed(window.location.pathname)) { schedule(); return; }
        seen.add(next.id);
        previousBuyer = next.buyer_key;
        setLeaving(false);
        setNotice(next);
        timer = setTimeout(() => {
          setLeaving(true);
          timer = setTimeout(() => { setNotice(null); schedule(); }, 250);
        }, NOTIFICATION_DURATION);
      } catch { if (!stopped) schedule(); }
    };
    schedule();
    return () => { stopped = true; clearTimeout(timer); };
  }, [fetchNotices]);

  if (!notice) return null;
  return (
    <aside role="status" aria-live="polite" aria-atomic="true" className={`purchase-notice fixed left-4 right-4 top-4 z-40 mx-auto flex max-w-sm items-center gap-3 rounded-lg border border-accent/30 bg-cream px-4 py-3 text-primary shadow-soft sm:left-auto sm:right-6 sm:top-6 sm:mx-0 sm:w-80 ${leaving ? "purchase-notice-out" : ""}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><ShoppingBag className="h-5 w-5" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{notice.display_name}</p>
        <p className="mt-0.5 text-xs leading-relaxed">Comprou a coleção de 365 receitas</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-secondary"><BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />Compra confirmada</p>
      </div>
    </aside>
  );
}