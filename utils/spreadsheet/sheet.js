const { OAuth2Client } = require('google-auth-library')
const { google } = require("googleapis");
const express = require("express");

class Spreadsheet {
    constructor(client_id, client_secret, redirect_url, scopes=['https://www.googleapis.com/auth/spreadsheets']) {
        this.app = new express();

        this.CLIENT_ID = client_id;//credentials
        this.CLIENT_SECRET = client_secret;//credentials
        this.REDIRECT_URI = redirect_url;//Must host a local server
        this.SCOPES = scopes;
        this.oAuth2Client = new OAuth2Client(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI);

        this.authUrl = this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES,
        });
        console.log('Authorize this app by visiting this URL:', this.authUrl);
    }

    async start(sheet_id, data, range='A1:B30') {
        this.app.get('/auth/google/callback', async (req, res) => {
            const code = req.query.code;
        
            try{
                const tokenResponse = await this.oAuth2Client.getToken(code);
                const accessToken = tokenResponse.tokens.access_token;  
                this.oAuth2Client.setCredentials({access_token: accessToken });
    
                const sheets = google.sheets({ version: 'v4', auth: this.oAuth2Client  });
                const request = {
                    spreadsheetId: sheet_id,//make personal spreadsheet
                    range: range,
                    valueInputOption: 'RAW',
                    requestBody: {
                        values: data // crawler.stored
                    },
                };
        
                const response = await sheets.spreadsheets.values.append(request);

                console.log('Data written to Google Sheet:', response.data);
    
                res.send('Data written to Google Sheet');
            } catch(err){
                console.error('Error exchanging code for access token: ', err);
                res.status(500).send('Error exchanging code for access token');
            }
        });

        this.server = this.app.listen(5500, () => {
            console.log('Server is running on port 5500');
        })
    }
}

module.exports = {Spreadsheet}