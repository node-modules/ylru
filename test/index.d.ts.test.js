'use strict';
const runScript = require('runscript');
const path = require('path');
const assert = require('assert');

describe('index.d.ts.test.js', () => {
  before(async () => {
    try {
      const stdio = await runScript('tsc -p ./ts/tsconfig.json', {
        stdio: 'pipe',
        cwd: path.join(__dirname, 'fixtures'),
        debug: true,
      });
      assert(!stdio.stderr);
    } catch (err) {
      console.error('should not throw error:', err.stdio.stdout.toString());
      throw err;
    }
  });

  it('should compile ts without error', async () => {
    const stdio = await runScript('node ./ts/check.js', {
      stdio: 'pipe',
      cwd: path.join(__dirname, 'fixtures'),
    });
    assert(!stdio.stderr);
  });
});
