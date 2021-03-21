const PROXY_CONFIG = {
    "/api/*": {
        "target": "https://192.168.1.215:5000",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": {
            "^/api/apps/running": "/api/system/apps/running",
            "^/api": ""
        }
        // ,"bypass": function (req, res, proxyOptions) {
        //     console.log(this)
        //     this.target = ''
        //     // this.PROXY_CONFIG['/api/*'].target = "https://192.168.1.215:5000"
        //     //this.PROXY_CONFIG.target = "https://192.168.1.215:5000"
        //     if (req.headers.accept.indexOf("html") !== -1) {
        //         console.log("Skipping proxy for browser request.");
        //         return "/index.html";
        //     }
        //     req.headers["X-Custom-Header"] = "yes";
        // }
    }
}

module.exports = PROXY_CONFIG;

// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyConfig = [{
//     context: '/api/*',
//     target: 'https://192.168.1.215:5000',
//     secure: false,
//     changeOrigin: true,
//     logLevel: "debug",
//     pathRewrite: {
//         "^/api/apps/running": "/api/system/apps/running",
//         "^/api": ""
//     }
// }];
// // return proxyConfig;
// // function setupForCorporateProxy(proxyConfig) {

// var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
// if (proxyServer) {
//     var agent = new HttpsProxyAgent(proxyServer);
//     console.log('Using corporate proxy server: ' + proxyServer);
//     proxyConfig.forEach(function (entry) {
//         entry.agent = agent;
//     });
// }
// return proxyConfig;
// //}

// setupForCorporateProxy(proxyConfig)

//module.exports = setupForCorporateProxy(proxyConfig);
// const PROXY_CONFIG = [
//     {
//         "/api/*": {
//             target: "https://192.168.1.215:5000",
//             secure: false,
//             changeOrigin: true,
//             logLevel: "debug",
//             "pathRewrite": {
//                 "^/api/apps/running": "/api/system/apps/running",
//                 "^/api": ""
//             }
//         }
//     }
// ]

// module.exports = PROXY_CONFIG;

// {
//     "/api/*": {
//         "target": "https://192.168.1.215:5000",
//             "secure": false,
//                 "changeOrigin": true,
//                     "logLevel": "debug",
//                         "pathRewrite": {
//             "^/api/apps/running": "/api/system/apps/running",
//                 "^/api": ""
//         }
//     }
// }

// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyConfig = [{
//     context: '/apps/running',
//     target: "https://192.168.1.215:5000/api/system/apps/running",
//     secure: true,
//     changeOrigin: true,
//     logLevel: "debug"
// }];

// function setupForCorporateProxy(proxyConfig) {
//     var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//     if (proxyServer) {
//         var agent = new HttpsProxyAgent(proxyServer);
//         console.log('Using corporate proxy server: ' + proxyServer);
//         proxyConfig.forEach(function (entry) {
//             entry.agent = agent;
//         });
//     }
//     return proxyConfig;
// }

// module.exports = setupForCorporateProxy(proxyConfig);