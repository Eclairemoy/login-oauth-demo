import { useEvervault } from '@evervault/react';
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

export default function FormComponent() {
  const evervault = useEvervault();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const encryptedPassword = await evervault.encrypt(event.target.password.value);
    const data = {'name': name, 'email': email,'password': encryptedPassword}
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const dbData = await supabase.from('users').insert(data).then(response => 
      { return response }).catch(function (error) { alert(`Something went wrong: ${error}`)
          return error })
    alert(`Password saved: ${encryptedPassword}`)
  }

  return (
        <form onSubmit={handleSubmit}>
          <p>
          <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </p>
          <p>
          <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </p>

          <p>
          <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </p>
            <p style={{paddingTop: '5px'}}>
          <button type="submit" >
          <span className="d-flex align-items-center">Create Account</span>
          </button>
          </p>
        </form>
  );
}

