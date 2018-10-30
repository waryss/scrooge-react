const initialState = {
  expenses: [], // Array of objects of type {text: 'my task', completed: false}
  displayType: 'all', // expected values: 'all', 'completed', 'active'
  session: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state,
        expenses: [...state.expenses, { text: action.payload, completed: false, id: action.id }],
      };
    case 'REMOVE_EXPENSE':
      var modifyState = state
      return {
        ...state,
        expenses: [...modifyState.expenses.slice(0, action.index), ...modifyState.expenses.slice(action.index + 1)],
      };
    case 'TOGGLE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense, index) => {
          if (index === action.index) {
            return {
              ...expense,
              completed: !expense.completed,
            };
          }
          return expense;
        }),
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state, displayType: action.displayType,
      };
    case 'SET_SESSION':
      return {
        ...state, session: action.session
      }
    case 'SET_FETCHED_EXPENSES':
      return {
        ...state, expenses: action.expenses
      }
    case 'RESET_STATE':
      return {
        ...initialState
      }
    default:
  }
  return state;
}
