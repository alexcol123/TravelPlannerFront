import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/appContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import moment from 'moment'

const Travels = ({ travels, updatingTravel }) => {
  const { deleteTravel } = useGlobalContext()

  if (travels.length < 1) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    )
  }

  return (
    <div>
      <>
        <Container>
          {travels.map((travel) => {
            const {
              _id: id,
              country,
              state,
              image,
              reason,
              visited,
              createdAt,
            } = travel
            let date = moment(createdAt)
            date = date.format('MMMM Do, YYYY')

            return (
              <article className='job' key={id}>
                <span className='icon'>{country}</span>
                <span>
                  <img
                    src={image}
                    alt='country you like to visit'
                    className='card-img'
                  />
                </span>
                <span className='position'>{country}</span>

                <span className='company'>
                  {/* {state.map((singleState) => `${singleState} `)} */}
                  States: {state.join(', ')}
                </span>
                <span className='date'>{date}</span>
                <span>Travel Reason: {reason}</span>
                <span>Visited: {visited ? 'yes' : 'not yet'}</span>

                <div className='action-div'>
                  <div
                    className='edit-btn'
                    type='button'
                    onClick={() => updatingTravel(travel)}
                  >
                    <FaEdit />
                  </div>
                  <button
                    className='delete-btn'
                    type='button'
                    onClick={() => deleteTravel(id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            )
          })}
        </Container>
      </>
    </div>
  )
}

const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`
const Container = styled.section`
  .job {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }
  .icon {
    background: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 1.3rem;
  padding : 0 15px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .position {
    font-weight: 600;
  }
  .date {
    color: var(--grey-500);
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
  }
  .edit-btn {
    color: var(--green-dark);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
  .edit-btn,
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }

  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .card-img{
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr ;
    column-gap: 1rem;
  }

  @media (min-width: 950px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }

  }
`
const setStatusColor = (status) => {
  if (status === 'interview') return '#0f5132'
  if (status === 'declined') return '#842029'
  return '#927238'
}
const setStatusBackground = (status) => {
  if (status === 'interview') return '#d1e7dd'
  if (status === 'declined') return '#f8d7da'
  return '#f7f3d7'
}

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`

export default Travels
