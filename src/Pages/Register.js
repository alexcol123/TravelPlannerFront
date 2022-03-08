import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/appContext'
import { Redirect } from 'react-router-dom'
import logo from '../assets/logo.svg'
import FormRow from '../components/FormRow'
import './Register.scss'

const Register = () => {
  // Global State
  const { user, register, login } = useGlobalContext()

  // local State
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isMember: true,
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (isMember) {
      login({ email, password })
    } else {
      register({ name, email, password })
    }
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <>
      {user && <Redirect to='/dashboard' />}

      <div className='register-login'>
        <div className='page full-page'>
          <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
              <img src={logo} alt='logo' className='logo' />

              <h4>{values.isMember ? 'Login' : 'Register'}</h4>

              {!values.isMember && (
                <FormRow
                  type='text'
                  name='name'
                  value={values.name}
                  handleChange={handleChange}
                />
              )}

              <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
              />

              <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
              />

              <button type='submit' className='btn btn-block'>
                Submit
              </button>

              <p>
                {values.isMember ? 'Not a member yet' : 'Already a member'}
                <button
                  type='button'
                  className='member-btn'
                  onClick={toggleMember}
                >
                  {values.isMember ? 'Register' : 'Login'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
