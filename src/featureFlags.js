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

    toggle(name) {
      const currentValue = flags.get(name) === true;
      flags.set(name, !currentValue);
    },

    snapshot() {
      return Object.fromEntries(flags.entries());
    }
  };
}