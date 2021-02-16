
global.steps = {};
global.steps.stop = require('./stop');
global.steps.prepare = require('./prepare');
global.steps.loading_roaster = require('./loading-roaster');
global.steps.roast = require('./roast');
global.steps.cooling = require('./cooling');
//global.steps.unloading_cooler = require('./unloading-cooler');

global.steps.stop.SetStatus(true);
