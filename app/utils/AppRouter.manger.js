const express = require("express");
const AppRouter = express.Router();
const fs = require("fs");
const path = require("path");

const initializeRoutes = (filepath, routname) => {
    // console.log(fs.readdirSync(filepath))
    fs.readdirSync(filepath).forEach(file => {
        const fullpath = path.join(filepath, file)

        if (fs.statSync(fullpath).isDirectory()) {
            if (file !== 'controllers'  && file !== 'models') {
                initializeRoutes(fullpath, routname)
            }
        }
        else{
            if (file.endsWith('routes.js')) {
                AppRouter.use(routname, require(fullpath))
                // console.log(`${routname} path is ${fullpath}`)
            }

        }
    })
}

initializeRoutes(path.join(__dirname, "../website"), '/user')
initializeRoutes(path.join(__dirname, "../admin"), '/admin')


module.exports = AppRouter;
