const dd = {
    id: '57eda0eb-fec7-4e90-aa26-fd7e720f9822',
    a: 'https://api-analytics.hydro.online/hydro-ping',
};

function generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function main(s) {
    const h = {
        // authority: 'api-analytics.hydro.online',
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        origin: "https://www.servicemanaged.com",
        referer: "https://www.servicemanaged.com/",
        'sec-ch-ua':
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', dd.a, true);

    for (const key in h) {
        xhr.setRequestHeader(key, h[key]);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.responseText === 'success') {
                console.log('SS : ' + s);
            } else {
                console.log('Error : ' + s);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error fetching data:', xhr.statusText);
    };

    const data = JSON.stringify({
        status: 1,
        tag_id: dd.id,
        session_id: s,
    });

    xhr.send(data);
}

let allInterval = [];

function createUser(s) {
    const interval = setInterval(() => {
        main(s);
    }, 14 * 1000);

    allInterval.push(interval);
}

function makeItFool(count = 25) {
    for (let i = 0; i < count; i++) {
        createUser(generateSessionId());
    }
}

function processIt() {
    console.log("I called process it")
    if (allInterval.length) {
        allInterval.forEach((i) => clearInterval(i));
        allInterval.length = 0;
    }
    makeItFool();
}

function main() {
    console.log("I called")
    processIt();
    setInterval(() => {
        processIt();
    }, 30 * 60 * 1000);
}
