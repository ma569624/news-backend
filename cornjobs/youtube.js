const YouTubeData = require("../models/youtube");
async function insertYouTubeData() {
  try {
    const apiKey = "AIzaSyAvgv1F4OfE_gtDlAtaikPgNxd-uxy-lm0";
    const channelId = "UC4qhbs7b2TEy2_dmd2xxXzw";
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
      );
      
      const data = await response.json();
      console.log(data);
      
      const { items } = data;
      
      // Loop through each item and save it individually
      for (const item of items) {
          const savedData = await YouTubeData.create({
              kind: item.kind,
              etag: item.etag,
              id: item.id,
              snippet: item.snippet
          });
          console.log("Data inserted successfully:", savedData);
      }
  } catch (error) {
      console.error("Error inserting data:", error);
      throw error; // Throw the error to be handled by the caller
  }
}

module.exports = insertYouTubeData;
