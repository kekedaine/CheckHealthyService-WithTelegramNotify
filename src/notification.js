import services from './config/config'
import Blurbird from 'bluebird'
import axios from 'axios'
import _ from 'lodash'

export const sendNotify = async (service, is_service_ok) => {
    if (service.notifications && !_.isEmpty(service.notifications)) {
        for (let notifyItem of service.notifications) {
            if (notifyItem.type === 'telegram') {
                axios({
                    method: 'get',
                    url: `https://api.telegram.org/bot${notifyItem.access}/sendMessage`,
                    data: {
                        chat_id: notifyItem.chat_id,
                        text: 'SERVICE: ' + service.name + ' - Status: ' + (is_service_ok ? 'UP' : 'DOWN')
                    }
                });
            }

            if (notifyItem.type === 'dingtalk') {
                // TODO: implement dingtalk

            }

            if (notifyItem.type === 'slack') {
                // TODO: implement slack

            }
        }
    }

};

