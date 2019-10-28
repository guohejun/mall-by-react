import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO} from "../actions";

const todos = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]
		case TOGGLE_TODO:
			return state.map((todo, index) => {
				if (index === action.index) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					})
				}
				return todo
			})
		default:
			return state
	}
}