import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'

import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_LOADING,
  FETCH_TRAVELS_SUCCESS,
  FETCH_TRAVELS_ERROR,
  SET_USER,
  CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_ERROR,
  DELETE_TRAVEL_SUCCESS,
  DELETE_TRAVEL_ERROR,
  UPDATE_TRAVEL_SUCCESS,
  UPDATE_TRAVEL_ERROR,
  LOGOUT_USER,
} from './actions'

const initialState = {
  user: null,
  isLoading: false,
  travels: [],
  showAlert: false,
  editItem: null,
  singleJogError: false,
  editComplete: true,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // Register
  const register = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(
        'https://travel-planer-alexcol.herokuapp.com/api/v1/auth/register',
        { ...userInput }
      )
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })

      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (err) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // Login
  const login = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(
        'https://travel-planer-alexcol.herokuapp.com/api/v1/auth/login',
        { ...userInput }
      )
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })

      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (err) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // Logout pending-------------------------------------------->>>

  // Get All Travels
  const getAllTravels = async () => {
    setLoading()
    try {
      const { data } = await axios.get(
        'https://travel-planer-alexcol.herokuapp.com/api/v1/travels'
      )

      dispatch({ type: FETCH_TRAVELS_SUCCESS, payload: data.travels })
    } catch (err) {
      dispatch({ type: FETCH_TRAVELS_ERROR })
    }
  }

  // Delete Traveil
  const deleteTravel = async (id) => {
    console.log(id)
    setLoading()
    try {
      await axios.delete(
        `https://travel-planer-alexcol.herokuapp.com/api/v1/travels/${id}`
      )

      dispatch({ type: DELETE_TRAVEL_SUCCESS, payload: id })
    } catch (err) {
      dispatch({ type: DELETE_TRAVEL_ERROR })
    }
  }

  // Update Travel
  const updateTravel = async (travel) => {
    const { id: _id } = travel
    try {
      if (travel.image instanceof File) {
        const imgLink = await uploadImage(travel)

        //  return console.log(imgLink)

        const { country, state, reason, visited } = travel

        const dataToSend = { country, state, image: imgLink, reason, visited }

        const { data } = await axios.patch(
          ` https://travel-planer-alexcol.herokuapp.com/api/v1/travels/${_id}`,
          dataToSend
        )

        return dispatch({ type: UPDATE_TRAVEL_SUCCESS, payload: data.travel })
      }
      if (travel.image.startsWith('http')) {
        const { data } = await axios.patch(
          ` https://travel-planer-alexcol.herokuapp.com/api/v1/travels/${_id}`,
          travel
        )
        return dispatch({ type: UPDATE_TRAVEL_SUCCESS, payload: data.travel })
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Create a travel
  const createTravel = async (userInput) => {
    const imgLink = await uploadImage(userInput)

    const { country, state, reason, visited } = userInput

    const dataToSend = { country, state, image: imgLink, reason, visited }

    setLoading()
    try {
      const { data } = await axios.post(
        'https://travel-planer-alexcol.herokuapp.com/api/v1/travels',
        dataToSend
      )
      dispatch({ type: CREATE_TRAVEL_SUCCESS, payload: data.travel })
    } catch (err) {
      // dispatch({ type: CREATE_TRAVEL_ERROR })
      console.log(err)
    }
  }

  // Upload image to cloudinary
  const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile.image)

    try {
      const { data } = await axios.post(
        'https://travel-planer-alexcol.herokuapp.com/api/v1/travels/upload',
        formData
      )
      return data.src
    } catch (err) {
      console.log(err)
    }
  }

  // Logourt
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.name })
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        // State
        ...state,
        // Functions
        register,
        login,
        getAllTravels,
        createTravel,
        deleteTravel,
        updateTravel,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
