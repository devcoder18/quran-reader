const fs = require('fs');
const path = require('path');
const https = require('https');

const url = "https://islamicstudies.info/quran/arabic/uthmanichafs.htm";

// Function to fetch HTML content from the URL
function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to extract Surah names from the HTML content
function extractSurahNames(html) {
    const surahList = [];
    const regex = /<ch>(.*?)<\/ch>/g;
    let match;
    let id = 1;

    while ((match = regex.exec(html)) !== null) {
        let name_arabic = match[1].trim();
        // Remove the first word "سُورَةُ"
        if (name_arabic.startsWith("سُورَةُ")) {
            name_arabic = name_arabic.replace("سُورَةُ", "").trim();
        }
        surahList.push({
            id: id,
            name_arabic: name_arabic
        });
        id++;
    }

    return { chapters: surahList };
}

// Main function to fetch, extract, and save Surah names
(async () => {
    try {
        const html = await fetchHTML(url);
        const surahList = extractSurahNames(html);
        const surahJson = JSON.stringify(surahList, null, 4);

        // Define the output file path
        const outputPath = path.join(__dirname, '../public/data/chapterNames.json');

        // Write the JSON string to the file
        fs.writeFileSync(outputPath, surahJson, 'utf-8');

        console.log(`Surah names have been saved to ${outputPath}`);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
})();
