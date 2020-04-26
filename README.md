# CheckHealthyService-WithTelegramNotify
Check Healthy Service-With Telegram Notify



create folder config/

File config/config.js
```js
module.exports = [
    {
        name: 'google',
        endpoint: 'https://www.google.com/',
        timeout: 5000,
        retries: 3,
        interval: 10000,
        notifications: [
            {
                type: 'telegram',
                access: '123456789:XXXXXXXXXXXXXXXXXXXXXXXXX',
                chat_id: '-12343454'
            }
        ]
    },
    {
        name: 'daitest',
        endpoint: 'http://localhost:8000',
        timeout: 5000,
        retries: 3,
        interval: 10000,
        notifications: [
            {
                type: 'telegram',
                access: '123456789:XXXXXXXXXXXXXXXXXXXXXXXXX',
                chat_id: '-12343454'
            }
        ]
    }

]
```

RUN:
```
docker run --rm -it -v $(pwd)/config:/app/dist/config kekedaine/checkhealthywithnotificationtele
```