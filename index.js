const axios = require("axios")
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const dd = {
   // id: 'dd868d51-1557-4b3d-bdce-c835b416636c',
   id:"499179df-b238-4934-b3d3-6ebc6ad907cb",
    website:'https://www.tealhq.com',
    a: 'https://api-analytics.hydro.online/hydro-ping',
}

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
        origin: dd.website,
        referer: dd.website+"/",
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
    const axiosConfig = {
        // proxy: {
        //   host: proxy.split(':')[1].substring(2), // Extracting the host from the proxy URL
        //   port: parseInt(proxy.split(':')[2]),
        // },
        headers: h,
    };

    axios
        .post(
            dd.a,
            {
                status: 1,
                tag_id: dd.id,
                session_id: s,
            },
            axiosConfig,
        )
        .then((response) => {

            response?.data !== 'success'
                ? console.log('Error : ' + s)
                : console.log(dd.id,'SS : ' + s);
        })
        .catch((error) => {
            console.error('Error fetching data:', error.message);
        });
}

// const s = generateSessionId()



let allInterval = []

function createUser(s) {
    main(s)

    const interval = setInterval(() => {
        main(s)
    }, 15* 1000)

    allInterval.push(interval)

}

function makeItFool(count = 25) {
    for (let i = 0; i < count; i++) {
        createUser(generateSessionId())
    }
}


function processIt() {
    if (allInterval.length) {
        allInterval.forEach((i) => clearInterval(i))
        allInterval.length = 0;
    }
    makeItFool()
    // setTimeout(() => {
    //     makeItFool()
    // }, 20 * 1000)
    // setTimeout(() => {
    //     makeItFool()
    // }, 40 * 1000)

}






app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    processIt()
    setInterval(() => {
        processIt()
    }, 30 * 60 * 1000)
    console.log(`Example app listening at http://localhost:${port}`);
});


// function makeItFool2(count = 5) {
//     for (let i = 0; i < count; i++) {
//         makeItFool()
//     }
// }

// makeItFool2()

// makeItFool

// function checkRateLimit(count = 10) {
//     for (let i = 0; i < count; i++) {
//         main(generateSessionId())
//     }
// }

// setInterval(() => checkRateLimit(100), 1000 * 60)
// checkRateLimit(100) 


//euvp4qWrvBfTynD8nOCgQ6Si
