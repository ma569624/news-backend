const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
// Helper function to dynamically require all routes
const requireRoutes = (basePath) => {
  fs.readdirSync(basePath).forEach((file) => {
    const fullPath = path.join(basePath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      requireRoutes(fullPath); // Recursive call for directories
    } else if (file.endsWith(".routes.js")) {
      try {
        let data = fs.readFileSync(fullPath, "utf8");

        // Regular expression to find the specific require pattern
        const regexRequireControllers = /require\('\.\.\/controllers\/([^']+)'\);/g;

        // Replace the patterns with the desired replacement
        let updatedContent = data.replace(
          regexRequireControllers,
          (match, p1) => {
            return `require('../controllers/${p1}.controllers');`;
          }
        );

        
        // Write the updated content back to the file
        // if(updatedContent !== data){
        //     fs.writeFileSync(fullPath, updatedContent, "utf8");
        //     console.log(`Patterns updated in file: ${fullPath}`);
        // }
       
      } catch (err) {
        console.error(`Error processing file ${fullPath}:`, err);
      }
    }
  });
  //   console.log(userControllerspaths)
};

// Base path for user routes
const baseUserPath = path.join(__dirname, "../website");
requireRoutes(baseUserPath);

module.exports = router;
