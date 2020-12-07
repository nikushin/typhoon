
module.exports = {
  recipe: {
    current_id: undefined,
    serial_number: undefined,
    name: undefined,
    amount: undefined,
    data:{
      heat_setting_arr: null,
      cooling_time: 0,
      prepare_sp: 0,
    }
  },
  retain:{
    heat_manual_sp: 0,
    vds_manual_sp: 0,
    roast_mode_auto: true,
    step: 60,
  },
  operative:{
    manual: {
      on: false,
      vds: false,
      vds_power: 0,
      heat: false,
      heat_power: 0,
      cooler: false,
      blades: false,
    }
  },
};
