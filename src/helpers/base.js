const fs = require('fs');
module.exports = {
      readCategory: () => {
            return new Promise((resolve, reject) => {
                  fs.readFile('./models/categoryModel.db', 'utf8', (err, data) => {
                        if (err) {
                              console.log(err);
                        } else {
                              // console.log(data);
                              resolve(JSON.parse(data))
                        }
                  });
            });
      },
      writeCategory: (title) => {
            return new Promise((resolve, reject) => {
                  fs.readFile('./models/categoryModel.db', 'utf8', (err, data) => {
                        if (err) {
                              console.log(err);
                        } else {
                              let base = JSON.parse(data);
                              base.push({
                                    id: base.length + 1,
                                    title
                              });
                              fs.writeFile('./models/categoryModel.db', JSON.stringify(base), 'utf8', (err) => {
                                    if (err) {
                                          console.log(err);
                                    } else {
                                          resolve(true);
                                    }
                              })
                        }
                  });
            });
      }
}