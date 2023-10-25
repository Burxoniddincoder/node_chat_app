const fs = require('fs')
const path = require('path')

 module.exports = (()=>{
    fs.readdir('./public', (err) =>{
        if(err){
            fs.mkdir(path.join('./' , 'public'), (err)=>{
                if(err){
                    console.log("Mkdir Public");
                }
            })
        }
    })
    fs.readdir('./public/user', (err) =>{
        if(err){
            fs.mkdir(path.join('./' , 'public', 'user'), (err)=>{
                if(err){
                    console.log("Mkdir User");
                }
            })
        }
    })
    fs.readdir('./public/post', (err) =>{
        if(err){
            fs.mkdir(path.join('./' , 'public', 'post'), (err)=>{
                if(err){
                    console.log("Mkdir Post");
                }
            })
        }
    })
 })