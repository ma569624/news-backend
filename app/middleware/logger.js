const fs = require('fs');
const path = require('path');

// Create a write stream (in append mode) for logging
const logStream = fs.createWriteStream(path.join(__dirname, 'request_logs.txt'), { flags: 'a' });

const logger = (req, res, next) => {
  const start = Date.now();
  
  // Capture the response finish event to log response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms\n`;

    // Write log to console
    console.log(log);

    // Write log to file
    logStream.write(log);
  });

  next();
};

module.exports = logger;
