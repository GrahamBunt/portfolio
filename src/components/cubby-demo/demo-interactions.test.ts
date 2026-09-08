import { test } from 'node:test';
import assert from 'node:assert/strict';
// Node's type stripping requires the explicit extension for this isolated test.
// @ts-expect-error -- the app imports this module through the bundler without an extension.
import { selectRange } from './demo-interactions.ts';

test('single, command-toggle, shift-range, and command-shift selection match the app', () => {
  const ids = ['a', 'b', 'c', 'd'];
  assert.deepEqual(selectRange(ids, ['a'], 'a', 'c', false, false), ['c']);
  assert.deepEqual(selectRange(ids, ['a'], 'a', 'a', false, true), []);
  assert.deepEqual(selectRange(ids, [], 'c', 'a', true, false), ['a', 'b', 'c']);
  assert.deepEqual(selectRange(ids, ['a'], 'c', 'd', true, true), ['a', 'c', 'd']);
  assert.deepEqual(selectRange(ids, ['a'], 'deleted', 'd', true, false), ['d']);
});
