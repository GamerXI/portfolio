// The @bible-strong/avatar-* packages ship .d.ts.map files whose `sources`
// point at their (unshipped) TypeScript source. In build mode (`tsc -b`) this
// makes TypeScript try to redirect to that source project and read a
// non-existent tsconfig.json, failing with TS5083. The maps are pure editor
// convenience, so we remove them after install to keep the build green.
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = [
  'node_modules/@bible-strong/avatar-react/dist',
  'node_modules/@bible-strong/avatar-core/dist',
];

function stripMaps(dir) {
  if (!existsSync(dir)) return 0;
  let removed = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      removed += stripMaps(full);
    } else if (entry.endsWith('.d.ts.map')) {
      rmSync(full);
      removed += 1;
    }
  }
  return removed;
}

let total = 0;
for (const root of roots) total += stripMaps(root);
if (total > 0) {
  console.log(`patched avatar packages: removed ${total} .d.ts.map file(s)`);
}
