const fs = require('fs');
const path = require('path');
module.exports = () => {
      fs.readdir('./models',(err)=>{
            if(err){
                  fs.mkdir(path.join('./', 'models'),(err)=>{
                        if(err){
                              console.log(err);
                        }
                  });
            }
      });
      
      fs.readFile('./models/categoryModel.db',(err)=>{
            if(err){
                  fs.writeFile(path.join('./','models','categoryModel.db'),'[]','utf8',(err)=>{
                        if(err){
                              console.log(err);
                              console.log("Hatolik");
                        }
                  });
            }
      });

      fs.readFile('./models/productModel.db',(err)=>{
            if(err){
                  fs.writeFile(path.join('./','models','productModel.db'),'[]','utf8',(err)=>{
                        if(err){
                              console.log(err);
                              console.log("Hatolik");
                        }
                  });
            }
      });
}