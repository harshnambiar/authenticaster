const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL parameter is required' }),
            headers: {
                'Access-Control-Allow-Origin': '*', 
            },
        };
    }

    try {
        const response = await axios.get(url);
        const data = response.data;

        
        // console.log("Fetched HTML content:", data);

        const $ = cheerio.load(data);
        
        const votes = $('.votes_value__9gu2X').text();
        const title = $('.details_title__oC_vX').text(); 
        const time = $('.details_date__alm2Z').text();

      
        // console.log("Extracted Votes:", votes || "Votes not found");
        // console.log("Extracted Title:", title || "Title not found");
        // console.log("Extracted Time:", time || "Time not found");

        
        return {
            statusCode: 200,
            body: JSON.stringify({ votes, title, time }), 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
            },
        };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
            headers: {
                'Access-Control-Allow-Origin': '*', 
            },
        };
    }
};
