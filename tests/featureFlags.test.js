import test from 'node:test';
import assert from 'node:assert/strict';
import { createFeatureFlags } from '../src/featureFlags.js';

test('feature flag defaults to disabled when it does not exist', () => {
  const flags = createFeatureFlags();

  assert.equal(flags.isEnabled('new-checkout'), false);
});

test('feature flag can be enabled and disabled', () => {
  const flags = createFeatureFlags({ 'new-checkout': false });

  flags.enable('new-checkout');
  assert.equal(flags.isEnabled('new-checkout'), true);

  flags.disable('new-checkout');
  assert.equal(flags.isEnabled('new-checkout'), false);
});

test('feature flags can expose a snapshot for debugging', () => {
  const flags = createFeatureFlags({ 'show-hidden-tasks': true });

  assert.deepEqual(flags.snapshot(), { 'show-hidden-tasks': true });
});
