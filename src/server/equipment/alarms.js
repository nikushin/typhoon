const emitter = global.emitter;
const alarms = global.memory.operative.alarms;
const socket = global.socket;

(function () {
    emitter.on('alarms', (alarm) => {
        if (alarm[0] === 'database') {
            alarms.data_base = true;
            console.log(alarms.data_base)
        }
        socket.emit("alarms", global.memory.operative.alarms);
    });
})();