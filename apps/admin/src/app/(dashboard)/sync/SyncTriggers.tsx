// Compatibility shim. The legacy three-card `SyncTriggers` client
// component was split into a server-composed `SyncTriggerBoard` plus
// individual `SyncTriggerCard`s under `_components/`. New imports
// should use those primitives directly so each card can read its own
// last-run snapshot.
//
// This file remains so that any out-of-tree import of the old symbol
// keeps compiling; it forwards to the new board with no last-run data,
// which the cards render as an "empty snapshot" state.
import { SyncTriggerBoard } from './_components/SyncTriggerBoard';

export function SyncTriggers(): React.ReactElement {
  return <SyncTriggerBoard snapshots={[]} />;
}
