import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        editComplete: false,
      }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }

    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        user: null,
        showAlert: true,
      }

    case FETCH_TRAVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editItem: null,
        singleJobError: false,
        editComplete: false,
        travels: action.payload,
      }

    case FETCH_TRAVELS_ERROR:
      return {
        ...state,
        isLoading: false,
      }

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case CREATE_TRAVEL_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        travels: [...state.travels, action.payload],
      }

    case UPDATE_TRAVEL_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        travels: state.travels.map((travel) => {
          if (travel._id === action.payload._id) {
            return (travel = action.payload)
          }
          return travel
        }),
      }

    case DELETE_TRAVEL_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        travels: state.travels.filter(
          (travel) => travel._id !== action.payload
        ),
      }

    case LOGOUT_USER:
      console.log(action.payload)
      return {
        ...state,
        user: null,
        showAlert: false,
        jobs: [],
        isEditing: false,
        editItem: null,
      }

    default:
      return state
  }
}

export default reducer
