const jwt = require('jsonwebtoken');
const { USER_SECRET } = require('../config/env');
const userModel = require('../models/user.model');
module.exports = {
    user: (req, res, next) => {
        const token = req.headers['x-admin-token'];
        if (!token || !token?.startsWith('Bearer ')) {
            res.send({
                ok: false,
                msg: "Avtorizatsiya qiling!"
            });
        } else {
            const signature = token.replace('Bearer ', '');
            jwt.verify(signature, USER_SECRET, async (err, data) => {
                if (err) {
                    res.send({
                        ok: false,
                        msg: "Signatura xato!"
                    });
                } else {
                    const { id } = data;
                    const $user = await userModel.findById(id);
                    if (!$user) {
                        res.send({
                            ok: false,
                            msg: "User topilmadi!"
                        });
                    } else {
                        const { image, full_name, phone, username } = $user;
                        req.user = {
                            id,
                            full_name,
                            image,
                            username
                        };
                        next();
                    }
                }
            });
        }
    }
}