const express = require("express");
const fs = require("fs");
const path = require("path");

const models = {};

const loadModelsFromDirectory = async (directoryPath) => {
    try {
        const files = await fs.promises.readdir(directoryPath);
        for (const file of files) {
          const fullPath = path.join(directoryPath, file);
          const stat = await fs.promises.stat(fullPath);
          if (stat.isDirectory()) {
            await loadModelsFromDirectory(fullPath);
          } else if (file.endsWith(".model.js") || file.endsWith(".models.js")) {
            const modelName = file.replace(/\.model\.js|\.models\.js/, "");
            models[modelName] = require(fullPath);
          }
        }
      } catch (error) {
        console.error(`Error reading directory ${directoryPath}:`, error);
      }
};

// Function to load all models from the admin directory
const loadAllModels = async () => {
    await loadModelsFromDirectory(path.join(__dirname, "../admin"));
  };
  
  // Immediately Invoked Function Expression (IIFE) to load all models
  (async () => {
    try {
      await loadAllModels();
      console.log("All models loaded Suceesfully");
    } catch (error) {
      console.error("Error loading models:", error);
    }
  })();

module.exports = (req, res, next) => {
  req.models = models;
  next();
};
