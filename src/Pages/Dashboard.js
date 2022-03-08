import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/appContext'
import FormRow from '../components/FormRow'
import Navbar from '../components/Navbar'
import Travels from '../components/Travels'
import { Redirect } from 'react-router-dom'

const Dashboard = () => {
  // Global State
  const { getAllTravels, createTravel, user, travels, updateTravel } =
    useGlobalContext()

  const sortedTravels = travels.sort((a, b) =>
    a.country > b.country ? 1 : b.country > a.country ? -1 : 0
  )

  // Local State

  const [values, setValues] = useState({
    country: '',
    state: '',
    image: undefined,
    reason: 'other',
    visited: false,
  })
  const [travelToEdit, setTravelToEdit] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [idToEdit, setidToEdit] = useState(null)
  const [showTravel, setShowTravel] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  /// SUBMIT ==============================================>>>>>>>>>>>>>>>>>>>>>>
  const handleSubmit = (e) => {
    e.preventDefault()
    const { country, state, image, reason, visited } = values

    if (
      country === '' ||
      state === '' ||
      image === '' ||
      reason === '' ||
      visited === ''
    ) {
      alert('Values can not be empty ')
    }

    if (isEditing === true) {
      console.log('update')
      updateTravel({ country, state, image, reason, visited, id: idToEdit })
      setValues({
        country: '',
        state: '',
        image: undefined,
        reason: 'other',
        visited: false,
      })

      setIsEditing(false)
      setShowTravel(false)
      return
    } else {
      console.log('create')
      createTravel({ country, state, image, reason, visited })

      setValues({
        country: '',
        state: '',
        image: undefined,
        reason: 'other',
        visited: false,
      })

      setIsEditing(false)
      setShowTravel(false)
      return
    }
  }

  const updatingTravel = (travel) => {
    setIsEditing(true)
    setShowTravel(true)

    setidToEdit(travel._id)
    setValues({
      ...values,
      country: travel.country,
      state: travel.state,
      image: travel.image,
      reason: travel.reason,
      visited: travel.visited,
    })
  }

  // Clear
  const clear = () => {
    setIsEditing(false)
    setidToEdit(false)
    setShowTravel(false)

    setValues({
      country: '',
      state: '',
      image: undefined,
      reason: 'other',
      visited: false,
    })
  }

  useEffect(() => {
    getAllTravels()
  }, [])

  return (
    <>
      {!user && <Redirect to='/' />}
      <Navbar />

      <Wrapper className='page'>
        <button
          type='btn'
          className='travel-btn btn'
          onClick={() => setShowTravel(true)}
        >
          Add New Travel +
        </button>
        {showTravel && (
          <form className='job-form' onSubmit={handleSubmit}>
            <FormRow
              type='text'
              name='country'
              placeholder='Country'
              value={values.country}
              handleChange={handleChange}
            />
            <label htmlFor=''>
              Enter State by Comma Separated: example: New York, Miami, Dallas
            </label>
            <FormRow
              type='text'
              name='state'
              placeholder='state'
              value={values.state}
              handleChange={handleChange}
            />
            <input
              type='file'
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
            />

            {/* Radio Reason for trip  =====================>>>>>>>>>>>>>>>>>>>>>>  */}

            <div className='radio'>
              <p>Reason for trip:</p>
              <input
                type='radio'
                id='vacation'
                name='vacation'
                value={values.reason}
                checked={values.reason === 'vacation'}
                onChange={(e) =>
                  setValues({ ...values, reason: e.target.name })
                }
                // onChange={(e) => setvalues.reason(e.target.value)}
              />
              <label htmlFor='vacation'>Vacation</label>

              <input
                type='radio'
                id='business'
                name='business'
                value={values.reason}
                checked={values.reason === 'business'}
                onChange={(e) =>
                  setValues({ ...values, reason: e.target.name })
                }
                // onChange={(e) => setvalues.reason(e.target.value)}
              />
              <label htmlFor='business'>Business</label>

              <input
                type='radio'
                id='spiritual'
                name='spiritual'
                value={values.reason}
                checked={values.reason === 'spiritual'}
                onChange={(e) =>
                  setValues({ ...values, reason: e.target.name })
                }
                // onChange={(e) => setvalues.reason(e.target.value)}
              />
              <label htmlFor='spiritual'>Spiritual</label>

              <input
                type='radio'
                id='other'
                name='other'
                value={values.other}
                checked={values.reason === 'other'}
                onChange={(e) =>
                  setValues({ ...values, reason: e.target.name })
                }
                // onChange={(e) => setvalues.reason(e.target.value)}
              />
              <label htmlFor='other'>Other</label>
            </div>

            {/* Radio Visited Yes?  =====================>>>>>>>>>>>>>>>>>>>>>>  */}

            <div className='radio'>
              <p>Have you visited yet ?</p>
              <input
                type='radio'
                id='yes'
                name='yes'
                value={values.visited}
                checked={values.visited === true}
                onChange={(e) => setValues({ ...values, visited: true })}
                // onChange={(e) => setvalues.visited(e.target.value)}
              />
              <label htmlFor='yes'>Yes</label>

              <input
                type='radio'
                id='no'
                name='no'
                value={values.visited}
                checked={values.visited === false}
                onChange={(e) => setValues({ ...values, visited: false })}
                // onChange={(e) => setvalues.reason(e.target.value)}
              />
              <label htmlFor='no'>No</label>
            </div>

            <button type='submit' className='btn'>
              {isEditing ? 'Update ' : 'AddTravel'}
            </button>

            <button type='button' className='btn btn-clear' onClick={clear}>
              clear
            </button>
          </form>
        )}
      </Wrapper>

      <Travels travels={sortedTravels} updatingTravel={updatingTravel} />
    </>
  )
}

const Wrapper = styled.section`
  padding: 3rem 0;
  margin-bottom: 25px;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;

    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      padding: 0.75rem;
      font-size: 1.2rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr;

      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
  .travel-btn {
    width: 30%;
    font-size: 20px;
    display: flex;
    aling-self: center;
    justify-content: center;
  }
  .btn-clear {
    background: lightGray;
    color: black;
  }
`

export default Dashboard
