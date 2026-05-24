import test from 'node:test';
import assert from 'node:assert/strict';
import { createFeatureFlags } from '../src/featureFlags.js';
import { createTaskBoard } from '../src/taskBoard.js';

test('task board starts with an empty summary', () => {
  const board = createTaskBoard();

  assert.deepEqual(board.summary(), {
    title: 'TBD Lab Board',
    total: 0,
    completed: 0,
    remaining: 0
  });
});

test('task board can add and complete small tasks', () => {
  const board = createTaskBoard();

  const task = board.addTask('Run CI before merging');
  board.completeTask(task.id);

  assert.deepEqual(board.summary(), {
    title: 'TBD Lab Board',
    total: 1,
    completed: 1,
    remaining: 0
  });
});

test('task title is required', () => {
  const board = createTaskBoard();

  assert.throws(() => board.addTask('   '), /Task title is required/);
});

test('hidden tasks stay invisible until the feature flag is enabled', () => {
  const flags = createFeatureFlags({ 'show-hidden-tasks': false });
  const board = createTaskBoard({ flags });

  board.addTask('Visible task');
  board.addTask('Experimental task', { hidden: true });

  assert.equal(board.summary().total, 1);

  flags.enable('show-hidden-tasks');
  assert.equal(board.summary().total, 2);
});
