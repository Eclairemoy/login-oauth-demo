export default function FormComponent() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const customerName = event.target.name.value;
    const customerEmail = event.target.email.value;

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify({'name': customerName, 'email': customerEmail})
    const endpoint = '/api/savetodb'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    const result = await response.json()
    console.log(result.data)
    alert(`Password saved: ${result.data}`)

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

