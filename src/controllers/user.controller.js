const { email: em } = require('email');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const moment = require('moment');
const { USER_SECRET } = require('../config/env');
module.exports = {
    SignUp: async (req, res) => {
        const { full_name, email, password, repassword, username } = req.body;
        if (!name || !email || !password || !repassword || !username) {
            res.send({
                ok: false,
                msg: "Qatorlarni to'ldiring!"
            })
        } else if (!em(email).isValid) {
            res.send({
                ok: false,
                msg: "Email noto'g'ri kiritilgan!"
            })
        } else if (!/^[A-z._0-9]{6,12}$/.test(password)) {
            res.send({
                ok: false,
                msg: "Parolni to'g'ri kiriting!"
            })
        } else if (password !== repassword) {
            res.send({
                ok: false,
                msg: "Parollar bir xil emas!"
            })
        } else {
            new userModel({
                full_name,
                email,
                username,
                password: md5(password),
                created: moment.now() / 1000
            }).save().then($saved => {
                const token = jwt.sign({ id: $saved._id }, USER_SECRET, { expiresIn: '30d' })
                $saved.set({ access: token }).save().then(() => {
                    res.send({
                        ok: true,
                        msg: "Yo`naltirildi!",
                        token
                    })
                })
            }).catch(err => {
                console.log(err)
                res.send({
                    ok: false,
                    msg: "Email avval ishlatilgan!"
                })
            })

        }
    },
    SignIn: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({
                ok: false,
                msg: "Qatorlarni to'ldiring!"
            })
        } else {
            const $user = await userModel.findOne({ email, password: md5(password) })
            if (!$user) {
                res.send({
                    ok: false,
                    msg: "Raqam yoki parol hato!"
                })
            } else {
                const token = jwt.sign({ id: $user._id }, USER_SECRET, { expiresIn: '30d' });
                $user.set({ access: token }).save().then(() => {
                    res.send({
                        ok: true,
                        msg: "Yo'naltirildi!",
                        token
                    })
                })
            }
        }
    },
    verifySession: (req, res) => {
        res.send({
            ok: true,
            data: req.user
        })
    },
    getbyid: async (req, res) => {
        const $user = await userModel.findById(id);
        if (!$user) {
            res.send({
                ok: false,
                msg: "User topilmadi!"
            })
        } else {
            const $modded = [];
            $base.forEach(({ _id, full_name, email, created, username }) => {
                $modded.unshift({
                    postId: _id,
                    full_name, email,
                    created, username
                })
            })
            res.send({
                ok: true,
                data: $modded
            })
        }
    },
    edit: async (req, res) => {
        const { id } = req.params;
        const $user = await userModel.findById(id);
        const image = req?.files?.image;
        function Editor() {
            if (!image) {
                return req.body, date;
            } else {
                fs.unlink(`.${$user.image}`, () => { });
                const filePath = `/public/user/${md5(image.name + new Date())}.png;`;
                image.mv(`.${filePath}`);
                return { ...req.body, date, image: filePath }
            }
        }
        $user.set(Editor()).save().then(() => {
            res.send({
                ok: true,
                msg: "O`zgartirildi!"
            })
        })
    }
}