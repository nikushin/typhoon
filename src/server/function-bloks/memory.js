
module.exports = {
  recipe: {
    current_id: undefined,
    serial_number: undefined,
    name: undefined,
    amount: undefined,
    data:{
      heat_setting_arr: [[0,0]],
    }
  },
  retain:{
    cooling_time: 0,
    vds_prepare_fr: 100,
    heat_manual_sp: 0,
    vds_manual_sp: 0,
    roast_mode: 'manual',
    step: 60,
    temp_prepare_sp: 0,
    manual: {
      vds_fr: 0,
      temp_sp: 0,
    }
  },
  operative:{
    temp_beans: undefined,
    temp_air: undefined,
    button_prepare: undefined,
    button_alarm: undefined,
    manual: {
      on: false,
      vds: false,
      heat: false,
      cooler: false,
      blades: false,
    }
  },
};
