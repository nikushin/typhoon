const atv_class = require("./ATV_class");
const universal_motor = require("./universal_motor");
const heater = require('./heater');
require('./alarms');

global.vds = new atv_class('vds', 1, 0);
global.cooler = new universal_motor('cooler');
global.blades = new universal_motor('blades');
global.heater = new heater();