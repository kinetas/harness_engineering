#!/usr/bin/env node
// Build SKILL.md from SKILL.md.tmpl — replaces {{PLACEHOLDER}} tokens with _fragments/ content.
// Usage: node build.js [--quiet]

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const FRAGMENTS_DIR = path.join(ROOT, '_fragments');
const QUIET = process.argv.includes('--quiet');

function log(...args) {
  if (!QUIET) console.log(...args);
}

// Load all fragments: read_state.md → key "READ_STATE"
const fragments = {};
for (const f of fs.readdirSync(FRAGMENTS_DIR).sort()) {
  if (!f.endsWith('.md')) continue;
  const key = f.slice(0, -3).toUpperCase().replace(/-/g, '_');
  fragments[key] = fs.readFileSync(path.join(FRAGMENTS_DIR, f), 'utf8').trim();
}

log(`Loaded fragments: ${Object.keys(fragments).join(', ')}\n`);

const header =
  '<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->\n' +
  '<!-- Regenerate: node build.js -->\n\n';

let built = 0;
for (const dir of fs.readdirSync(ROOT).sort()) {
  if (dir.startsWith('.') || dir.startsWith('_')) continue;
  const tmplPath = path.join(ROOT, dir, 'SKILL.md.tmpl');
  if (!fs.existsSync(tmplPath)) continue;

  let content = fs.readFileSync(tmplPath, 'utf8');
  let hasUnknown = false;

  content = content.replace(/\{\{([A-Z_]+)\}\}/g, (match, name) => {
    if (name in fragments) return fragments[name];
    console.warn(`  ⚠️  Unknown fragment {{${name}}} in ${dir}/SKILL.md.tmpl`);
    hasUnknown = true;
    return match;
  });

  fs.writeFileSync(path.join(ROOT, dir, 'SKILL.md'), header + content);
  log(`  ${hasUnknown ? '⚠️ ' : '✅'} ${dir}/SKILL.md`);
  built++;
}

log(`\nDone. Built ${built} skill(s).`);
