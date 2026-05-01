import { SYNC_ENTITY_META, type SyncEntitySnapshot } from './sync-page.types';
import styles from './sync.module.scss';
import { SyncTriggerCard } from './SyncTriggerCard';

interface SyncTriggerBoardProps {
  snapshots: readonly SyncEntitySnapshot[];
}

/**
 * Server component composing the three trigger cards in the editorial
 * 5-4-3 grid. Stateless; each card carries its own local state for the
 * POST in-flight indicator and the cooldown lock.
 */
export function SyncTriggerBoard({ snapshots }: SyncTriggerBoardProps): React.ReactElement {
  const byKey = new Map<string, SyncEntitySnapshot>();
  for (const s of snapshots) byKey.set(s.entity, s);

  return (
    <div className={styles.triggerBoard}>
      {SYNC_ENTITY_META.map((meta) => {
        const snapshot: SyncEntitySnapshot = byKey.get(meta.key) ?? {
          entity: meta.key,
          lastRun: null,
          isRunning: false,
        };
        return <SyncTriggerCard key={meta.key} meta={meta} snapshot={snapshot} />;
      })}
    </div>
  );
}
