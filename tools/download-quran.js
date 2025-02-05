const path = require('path');
const fs = require('fs');
const https = require('https');

// Define the URLs for the Quran.com API
const chaptersApiUrl = 'https://api.quran.com/api/v4/chapters';
const versesApiUrl = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=';

// Define the base path to save the data
const basePath = path.join(__dirname, '../public/data');

// Define the path to save the chapters JSON
const chaptersPath = path.join(basePath, 'chapters.json');
const chaptersDir = path.join(basePath, 'chapters');

// Function to download a file from a URL and save it to a destination path
function downloadFile(url, destPath, callback) {
    https.get(url, (response) => {
        let data = '';

        // A chunk of data has been received.
        response.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        response.on('end', () => {
            fs.writeFileSync(destPath, data, 'utf8');
            console.log(`File downloaded and saved to ${destPath} successfully.`);
            if (callback) callback();
        });
    }).on('error', (error) => {
        console.error(`Error downloading file from ${url}:`, error);
    });
}

// Function to download the chapters JSON
function downloadChapters() {
    downloadFile(chaptersApiUrl, chaptersPath, () => {
        const chaptersData = JSON.parse(fs.readFileSync(chaptersPath, 'utf8'));
        chaptersData.chapters.forEach((chapter) => {
            const chapterNumber = chapter.id;
            const chapterPath = path.join(chaptersDir, `${chapterNumber}.json`);
            downloadFile(`${versesApiUrl}${chapterNumber}`, chapterPath);
        });
    });
}

// Ensure the chapters directory exists
if (!fs.existsSync(chaptersDir)) {
    fs.mkdirSync(chaptersDir, { recursive: true });
}

// Call the function to download the chapters
downloadChapters();
