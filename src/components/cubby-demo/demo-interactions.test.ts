import { test } from 'node:test';
import assert from 'node:assert/strict';
// Node's type stripping requires the explicit extension for this isolated test.
// @ts-expect-error -- the app imports this module through the bundler without an extension.
import { selectRange, updateNote, deletionTargets } from './demo-interactions.ts';

test('single, command-toggle, shift-range, and command-shift selection match the app', () => {
  const ids = ['a', 'b', 'c', 'd'];
  assert.deepEqual(selectRange(ids, ['a'], 'a', 'c', false, false), ['c']);
  assert.deepEqual(selectRange(ids, ['a'], 'a', 'a', false, true), []);
  assert.deepEqual(selectRange(ids, [], 'c', 'a', true, false), ['a', 'b', 'c']);
  assert.deepEqual(selectRange(ids, ['a'], 'c', 'd', true, true), ['a', 'c', 'd']);
  assert.deepEqual(selectRange(ids, ['a'], 'deleted', 'd', true, false), ['d']);
});

test('saving a note preserves its timestamp, day, identity, and chronological position', () => {
  const notes = [
    { id: 'a', text: 'Before', day: 'Yesterday', time: '3:24 pm' },
    { id: 'b', text: 'Unchanged', day: 'Today', time: '9:16 am' },
  ];
  const updated = updateNote(notes, 'a', 'After');
  assert.deepEqual(updated, [{ ...notes[0], text: 'After' }, notes[1]]);
  assert.equal(notes[0].text, 'Before');
  assert.equal(updated[1], notes[1]);
  assert.deepEqual(updateNote(notes, 'missing', 'After'), notes);
  assert.equal(updateNote(notes, 'a', '')[0].text, '');
});

test('trash deletes a selected group or only an unselected target', () => {
  assert.deepEqual(deletionTargets('b', ['a', 'b']), ['a', 'b']);
  assert.deepEqual(deletionTargets('c', ['a', 'b']), ['c']);
  assert.deepEqual(deletionTargets('a', []), ['a']);
});
