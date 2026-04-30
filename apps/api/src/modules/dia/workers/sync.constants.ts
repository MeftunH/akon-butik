export const DIA_SYNC_QUEUE = 'dia-sync';

export type DiaSyncJobName = 'products' | 'stock' | 'categories';

export const DIA_SYNC_REPEAT_PATTERNS: Record<DiaSyncJobName, string> = {
  // crontab: minute hour dom month dow
  products: '*/30 * * * *', // every 30 min
  stock: '*/5 * * * *', // every 5 min
  categories: '17 3 * * *', // 03:17 daily (off-peak, avoid the top-of-hour stampede)
};
