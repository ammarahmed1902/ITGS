import fs from 'node:fs';

const reportPath = 'output/remediation/browser-results.json';
if (!fs.existsSync(reportPath)) process.exit(0);

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const escapeProperty = (value) => String(value).replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A').replaceAll(':', '%3A').replaceAll(',', '%2C');
const escapeMessage = (value) => String(value).replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');

function reportSuite(suite) {
  for (const spec of suite.specs || []) {
    if (spec.ok) continue;
    for (const test of spec.tests || []) {
      for (const result of test.results || []) {
        if (!['failed', 'timedOut', 'interrupted'].includes(result.status)) continue;
        const detail = (result.errors || []).map((error) => error.message || error.value || String(error)).join('\n') || `Playwright result: ${result.status}`;
        const file = `tests/browser/${spec.file}`;
        const title = `${test.projectName}: ${spec.title}`;
        console.log(`::error file=${escapeProperty(file)},line=${spec.line || 1},col=${spec.column || 1},title=${escapeProperty(title)}::${escapeMessage(detail)}`);
      }
    }
  }
  for (const child of suite.suites || []) reportSuite(child);
}

for (const suite of report.suites || []) reportSuite(suite);
