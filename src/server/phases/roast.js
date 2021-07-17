// const arr = global.memory.recipe.data.heat_setting_arr;

class step_roast {
    constructor() {
        global.emitter.on('button_stop', () => {
            if (this.status) {
                this.toUnloadingRoaster();
            }
        });
        global.emitter.on('new_roast_mode', () => this.NewRoastMode());
    }

    status = false;
    roast_finish_delay = false;
    roast_finish_delay_timeout = undefined;
    roastSecond = 0;

    SetStatus = (value) => {
        this.status = value;
        if (value) {
            this.roastSecond = 0;
            global.memory.history.date_roast_start = Date.now() - global.memory.history.date_start;
            global.vds.SwitchPower(true);
            global.heater.SwitchAllow(true);
        } else {
            this.NewRoastMode()
        }
        global.socket.emit("phases_status", {roast: this.status});
    };

    NewRoastMode = () => {
        const arr = global.memory.recipe.data.heat_setting_arr;
        let roast_power = 0;
        if (global.memory.retain.roast_mode === 'auto') {
            if (this.status) {
                arr.forEach((item) => {
                    if (item[0] <= this.roastSecond) {
                        roast_power = item[1]
                    }
                });
            } else {
                arr.forEach((item) => {
                    if (item[0] <= 0) {
                        roast_power = item[1]
                    }
                });
            }
        }
        if (global.memory.retain.roast_mode === 'manual') {
            if (this.status) {
                //if background
                arr.forEach((item) => {
                    if (item[0] <= this.roastSecond) {
                        roast_power = item[1]
                    }
                });
                //if auto...
                global.memory.retain.heat_manual_sp = roast_power;
            } else {
                roast_power = global.memory.retain.heat_manual_sp;
            }
        }
        if (global.memory.retain.roast_mode === 'background') {
            const background = global.memory.history.background;
            background.arr_done.forEach((item) => {
                if (item[0] <= this.roastSecond) {
                    roast_power = item[1]
                }
            });
        }
        global.socket.emit('memory_change', {heat_power_indicator: roast_power});
    };

    toUnloadingRoaster = () => {
        this.rememberHistory();
        this.roast_finish_delay = true;
        this.roast_finish_delay_timeout = setTimeout(() => {
            this.roast_finish_delay = false;
            if (global.memory.operative.button_prepare) {
                global.steps.prepare.SetStatus(true);
            }
        }, 5000);
        this.SetStatus(false);
        global.steps.cooling.SetStatus(true);
    };

    RoastTick = () => {
        if (!this.status) {
            return undefined
        }
        if (this.roastSecond > 500) {
            this.toUnloadingRoaster();
            return undefined
        }
        const arr = global.memory.recipe.data.heat_setting_arr;
        let roast_power = 0;
        if (global.memory.retain.roast_mode === 'auto') {
            arr.forEach((item) => {
                if (item[0] <= this.roastSecond) {
                    roast_power = item[1]
                }
            });
        }
        if (global.memory.retain.roast_mode === 'manual') {
            roast_power = global.memory.retain.heat_manual_sp;
        }
        if (global.memory.retain.roast_mode === 'background') {
            const background = global.memory.history.background;
            //const real_time = Date.now() - global.memory.history.date_start;
            let bg_roast_power = 0;
            let actual_history_index = 0;
            background.arr_done.forEach((item) => {
                if (item[0] <= this.roastSecond) {
                    bg_roast_power = item[1]
                }
            });
            for (let i = 0; i < background.history.length; i++) {
                //if (background.history[i][2] / 1000 >= real_time) {
                if (background.history[i][2] / 1000 >= this.roastSecond) {
                    break
                }
                actual_history_index = i;
            }


            const getDeltaTime = (index, arr) => {
                let delta_time = arr[index][1] - arr[index-1][1];
                if (arr[index][1] < arr[index-1][1]) {delta_time += 65535;}
                return delta_time
            };
            const getSpeed = (index, arr) => {
                return (arr[index][0] - arr[index - 1][0]) /
                (1/(getDeltaTime(index, arr)/100))
            };
            const getAcc = (index, arr) => {
                return getSpeed(index, arr) - getSpeed(index-1, arr) /
                    (1/(getDeltaTime(index, arr)/100))
            };
            const bg_temp = background.history[actual_history_index][0];
            const bg_speed = getSpeed(actual_history_index, background.history);
            const bg_acceleration = getAcc(actual_history_index, background.history);

            const now_history = global.memory.history.temp_beans_history;
            //console.log(now_history[0]);
            const last_index = now_history.length - 1;

            const now_temp = now_history[last_index][0];
            const now_speed = getSpeed(last_index, now_history);
            const now_acceleration = getAcc(last_index, now_history);

            const k = global.memory.retain.background_coefficients;
            const t_summ  = (bg_temp - now_temp) * k.t;
            const v_summ  = (bg_speed - now_speed) * k.v;
            const a_summ  = (bg_acceleration - now_acceleration) * k.a;
            roast_power = t_summ + v_summ + a_summ + bg_roast_power;

            if (roast_power > 100) roast_power = 100;
            if (roast_power < 0) roast_power = 100;
            console.log(bg_roast_power);
            global.socket.emit('memory_change', {background_data: {p0: bg_roast_power, tsp: bg_temp, t: now_temp,
                    vsp: bg_speed, v: now_speed, asp: bg_acceleration, a: now_acceleration,
                    t_summ: t_summ, v_summ: v_summ, a_summ: a_summ}});
        }

        if (global.heater.power !== roast_power) {
            global.heater.SetRoastPower(roast_power);
        }

        const data = {roast_power: roast_power, roast_second: this.roastSecond};
        this.roastSecond += 1;
        return data
    };

    rememberHistory = () => {
        global.memory.history.temp_beans_history_remember = JSON.parse(JSON.stringify(global.memory.history.temp_beans_history));
        for (let i = 0; i < global.memory.history.temp_beans_history_remember.length; i++)
            global.memory.history.temp_beans_history_remember[i][2] -= global.memory.history.date_roast_start
    };

}

module.exports = new step_roast();
