export function createFeatureFlags(initialFlags = {}) {
  const flags = new Map(Object.entries(initialFlags));

  return {
    isEnabled(name) {
      return flags.get(name) === true;
    },

    enable(name) {
      flags.set(name, true);
    },

    disable(name) {
      flags.set(name, false);
    },

    snapshot() {
      return Object.fromEntries(flags.entries());
    }
  };
}
