const axios = require('axios');
import { createClient } from '@supabase/supabase-js'
const Evervault = require('@evervault/sdk');

export default async function handler(req, res) {

    // initialise the Evervault SDK and enable outbound relay
    const evervault = new Evervault(process.env.NEXT_EVERVAULT_API_KEY);
    await evervault.enableOutboundRelay()
    
    // request the access token using the code
    const data  = {'client_id': process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID, 'client_secret': process.env.GITHUB_CLIENT_SECRET, 'code': req.query.code};
    const headers = {'headers': {'accept': 'application/json'}} 

    // access token is encrypted with response encryption
    let accessToken = await axios.post('https://github.com/login/oauth/access_token', data, headers).then(response => { return response.data.access_token })

    // request the name and email data using the encrypted access token
    const emailHeaders = {'headers': {"Authorization": "Bearer " + accessToken, "accept": "application/vnd.github+json"}}
    const email = await axios.get('https://api.github.com/user', emailHeaders).then(response => { return response.data })

    // save the user data to the database
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const dbData = await supabase.from('users').insert({name: email.name, email: email.email, auth_token: accessToken, password: null})
    .then(response => { 
        return response
    })
    .catch(function (error) {
        return error
    })
 
    res.status(200).json({ status: dbData.statusText, access_token: accessToken })
}

