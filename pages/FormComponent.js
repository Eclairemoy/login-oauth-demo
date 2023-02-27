import { useEvervault } from '@evervault/react';
import { createClient } from '@supabase/supabase-js'

export default function FormComponent() {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const evervault = useEvervault();
    
    const encryptedPassword = await evervault.encrypt(event.target.password.value);
    const customerName = event.target.name.value;
    const customerEmail = event.target.email.value;

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify({'name': customerName, 'email': customerEmail, 'password': encryptedPassword})

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const dbData = await supabase.from('users').insert(JSONdata).then(response => { 
        return response
    })
    .catch(function (error) {
        return error
    })
    console.log(dbData.statusText);
    console.log(encryptedPassword);
    // const endpoint = '/api/savetodb'

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // Body of the request is the JSON data we created above.
    //   body: JSONdata,
    // }

    // // Send the form data to our forms API on Vercel and get a response.
    // const response = await fetch(endpoint, options)

    // // Get the response data from server as JSON.
    // const result = await response.json()
    // console.log(result.data)
    alert(`Password saved: ${encryptedPassword}`)

  };

  return (
        <form onSubmit={handleSubmit}>
          <p>
          <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </p>
          <p>
          <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
          </p>

          <p>
          <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" required />
            </p>
            <p style={{paddingTop: '5px'}}>
          <button type="submit" >
          <span className="d-flex align-items-center">Create Account</span>
          </button>
          </p>
        </form>
  );
}

