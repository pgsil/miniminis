import { ADD_NUMBER, DEC_NUMBER } from './actions'


const initialState = {
  counter: 0,
  name: "johnny"
};

export default function simpleApp(state = initialState, action){
	const newState = {};

	switch(action.type){
		case ADD_NUMBER:			
			newState.counter= state.counter + action.value;

			return {...state, ...newState}

		case DEC_NUMBER:
			newState.counter= state.counter - action.value;

			return {...state, ...newState}

		default:
			return state
	}

}