import { createFeatureFlags } from './featureFlags.js';
import { createTaskBoard } from './taskBoard.js';

const flags = createFeatureFlags({ 'show-hidden-tasks': false });
const board = createTaskBoard({ flags });

board.addTask('Create a short-lived branch');
board.addTask('Run automated tests before merge');
board.addTask('Hide unfinished feature behind a flag', { hidden: true });
board.completeTask(1);

console.log('Trunk-Based Development Lab');
console.log(board.summary());

flags.enable('show-hidden-tasks');
console.log('After enabling feature flag');
console.log(board.summary());
