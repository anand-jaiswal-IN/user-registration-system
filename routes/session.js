var express = require('express');
var router = express.Router();

router.get("/", (req, res)=>{
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.sessionStore);
    console.log(req.cookies);
    if (req.session.views) {
        if(req.session.views >= 5) {
            req.session.destroy();
        }
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times`);
    } else {
        req.session.views = 1;
        res.send('Welcome to this page for the first time!');
    }
})

module.exports = router;