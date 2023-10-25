const fs = require('fs')
const path = require('path')

module.exports = (()=>{
    fs.readFile('./src/router.js', 'utf-8', (err,data)=>{
        if(err){
            fs.writeFile(path.join('./src', 'router.js'),"module.exports = require('express')()", 'utf-8', (err)=>{
                if(err){
                    console.log("file error");
                }
            })     
        }
    })
    fs.readFile('./src/router.js', 'utf-8', (err,data)=>{
        if(!data){
            fs.writeFile(path.join('./src', 'router.js'),"module.exports = require('express')()", 'utf-8', (err)=>{
                if(err){
                    console.log("file error");
                }
            })     
        }
    })
})