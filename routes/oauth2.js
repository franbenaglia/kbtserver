const express = require('express');
const passport = require('../security/passport.js');
const oauth2Controller = require('../controllers/oauth2.js');
const frontendserver = require('../config/constants.js').FRONT_END_SERVER;

const router = express.Router();

router.get("/", oauth2Controller.notLogged);

router.get("/failed", oauth2Controller.failed);

router.get("/success", oauth2Controller.success)

router.get('/google',
    passport.authenticate('google', {
        scope:
            ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
        accessType: 'offline',
        prompt: 'consent',
    }
    ),
    (req, res) => {
        res.send(req.user ? 200 : 401);
    },

);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: frontendserver + '/login',
    }),

    (req, res) => {

        const token = req.user.accesToken;
        const name = req.user.name;

        res.cookie('token', token);
        res.cookie('username', name);
        res.redirect(frontendserver + '/');
    }
);

router.get('/github',
    passport.authenticate('github', {
        scope:
            ['read:user', 'user:email'],
        accessType: 'offline',
        prompt: 'consent',
    }
    )
);

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: frontendserver + '/login',
    }),

    (req, res) => {

        const token = req.user.accesToken;
        const name = req.user.name;

        res.cookie('token', token);
        res.cookie('username', name);
        res.redirect(frontendserver + '/');

    }
);


module.exports = router;