import services from './config/config'
import Blurbird from 'bluebird'
import axios from 'axios'
import _ from 'lodash'
import * as Notification from './notification'
const si = require('systeminformation');
console.log("Check Health Service");
console.log(services)

let data = {}
async function run(_service) {
    let service = _service
    try {
        if (!data[service.name]) {
            data[service.name] = {
                is_ok: true,
                is_ok_lastest: true,
                is_prepare: false,
                attempts: 0
            }
        }
        console.log('run at ', service.name)
        await axios.get(service.endpoint, { timeout: service.timeout })
            .then(function (response) {
                console.log('data OK = ', data[service.name]);
                data[service.name].is_ok_lastest = true
                if (!data[service.name].is_ok) {
                    data[service.name].attempts++
                    data[service.name].is_prepare = true
                    if (data[service.name].attempts == service.retries) {
                        data[service.name].is_ok = true
                        data[service.name].attempts = 0
                        data[service.name].is_prepare = false
                        console.log('PUSH TO NOTIFY: UPPPPPP = ', service.name);
                        Notification.sendNotify(service, "UP")
                    }
                } else {
                    if (data[service.name].is_prepare) {
                        data[service.name].attempts = 0
                    }
                }
            })
            .catch(function (error) {
                console.log('data DOWN = ', data[service.name]);
                if (data[service.name].is_ok) {
                    data[service.name].attempts++
                    data[service.name].is_prepare = true
                    if (data[service.name].attempts == service.retries) {
                        data[service.name].is_ok = false
                        data[service.name].attempts = 0
                        data[service.name].is_prepare = false
                        console.log('PUSH TO NOTIFY SERVER : DOWNNNNNNNNNNNNN = ', service.name);
                        Notification.sendNotify(service, "DOWN")
                    }

                    if (data[service.name].is_ok_lastest) {
                        // push notify warning
                        Notification.sendNotify(service, "WARNING")
                        data[service.name].is_ok_lastest = false
                    }

                } else {
                    if (data[service.name].is_prepare) {
                        data[service.name].attempts = 0
                    }
                }
            })

        setTimeout(() => {
            run(service)
        }, (service.interval));
    } catch (e) {
        console.log(e);
    }

}

async function main() {
    for (let service of services) {
        await Blurbird.delay(100)
        run(service)
    }
}

main()

// data.currentload: check cpu self host

// setInterval(() => {
//     si.currentLoad()
//         .then(data => console.log(data.currentload))
//         .catch(error => console.error(error));
// }, 1000)
