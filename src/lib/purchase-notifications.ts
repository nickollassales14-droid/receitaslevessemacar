export const MIN_NOTIFICATION_DELAY = 30_000;
export const MAX_NOTIFICATION_DELAY = 120_000;
export const NOTIFICATION_DURATION = 5_000;

export type PurchaseNotice = { id: string; buyer_key: string; display_name: string };

export function notificationDelay(random = Math.random): number {
  return MIN_NOTIFICATION_DELAY + Math.floor(random() * (MAX_NOTIFICATION_DELAY - MIN_NOTIFICATION_DELAY + 1));
}

export function selectNotice(notices: PurchaseNotice[], seen: Set<string>, previousBuyer?: string) {
  return notices.find((notice) => !seen.has(notice.id) && notice.buyer_key !== previousBuyer);
}

export function notificationsAllowed(pathname: string) {
  return pathname === "/";
}