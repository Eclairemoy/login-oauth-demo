const axios = require('axios');
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {

    // initialise the Evervault SDK and enable outbound relay
    
    // request the access token using the code 

    // access token is encrypted with response encryption

    // request the name and email data using the encrypted access token

    // save the user data to the database
 
    res.status(200).json({ status: dbData.statusText, access_token: accessToken })
}

