import { createClient } from '@supabase/supabase-js'

export default async function savetoDB(req, res) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const dbData = await supabase.from('users').insert(req.body).then(response => { 
        return response
    })
    .catch(function (error) {
        return error
    })
    res.status(200).json({ status: dbData.statusText, data: req.body })
}