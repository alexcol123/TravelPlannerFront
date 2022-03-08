import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import main from '../assets/main.svg'
import logo from '../assets/logo.svg'
import { useGlobalContext } from '../context/appContext'
import './Home.scss'

const Home = () => {
  const { user } = useGlobalContext()

  return (
    <div className='home'>
        {user && <Redirect to='/dashboard' />}
      <nav>
        <img src={logo} alt='jobs app' />{' '}
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>travel planner app</h1>
          <p>
            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
            photo booth plaid jianbing actually squid 3 wolf moon lumbereual.
            Hell of humblebrag gluten-free lo-fi man braid leggings.
          </p>

          <Link to='/register' className='btn hero-btn'>
            Login / Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </div>
  )
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  h1 {
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Home
