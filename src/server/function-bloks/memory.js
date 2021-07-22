
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
    },
    background_coefficients: {
      t:0,
      v:0,
      a:0,
    },
  },
  operative:{
    temp_beans: undefined,
    temp_air: undefined,
    button_prepare: undefined,
    button_alarm: undefined,
    alarms: {
      analog_input_module : false,
      discrete_input_module : false,
      discrete_output_module : false,
      vds_invertor : false,
      rs485 : false,
    },
    manual: {
      on: false,
      vds: false,
      heat: false,
      cooler: false,
      blades: false,
    }
  },
  history: {
    date_start: Date.now(),
    date_roast_start: undefined,
    date_roast_finish: undefined,
    temp_beans_history: [],
    temp_beans_history_remember: [],
    background: {
      temp_beans: [],
      arr_done: [],
      history: [],
    },
  },
};