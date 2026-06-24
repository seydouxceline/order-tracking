// Shared config & logic — imported by track.html and admin.html

const STATUS_THRESHOLDS = {
  confirmed:  3,   // J0-J2
  processing: 8,   // J3-J7 (T+5)
  shipped:    23,   // J8-J22
  transit:    33,   // J23-J32
  customs:    48,   // J33-J47
  approach:   60,   // J48-J59
};

function getBusinessDaysElapsed(orderDate) {
  const start = new Date(orderDate);
  const today = new Date();
  let count = 0;
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  while (cur < today) {
    cur.setDate(cur.getDate() + 1);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
}

function calculateAutoStatus(orderDate) {
  if (!orderDate) return 'confirmed';
  const days = getBusinessDaysElapsed(orderDate);
  if (days < STATUS_THRESHOLDS.confirmed)  return 'confirmed';
  if (days < STATUS_THRESHOLDS.processing) return 'processing';
  if (days < STATUS_THRESHOLDS.shipped)    return 'shipped';
  if (days < STATUS_THRESHOLDS.transit)    return 'transit';
  if (days < STATUS_THRESHOLDS.customs)    return 'customs';
  if (days < STATUS_THRESHOLDS.approach)   return 'approach';
  return 'delivered';
}

function generateUniqueTrackingId() {
  const now = new Date();
  const y = now.getFullYear();
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  return `TRK-${y}-${ts}${rand}`;
}
