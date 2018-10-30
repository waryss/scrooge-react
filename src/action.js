import {AsyncStorage, Alert} from 'react-native';

export function addExpense(payload, id) {
  return {
    type: 'ADD_EXPENSE',
    payload,
    id
  };
}

export function toggleExpense(index) {
  return {
    type: 'TOGGLE_EXPENSE',
    index,
  };
}

export function removeExpense(index) {
  return {
    type: 'REMOVE_EXPENSE',
    index,
  };
}

export function setVisibilityFilter(displayType) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    displayType,
  };
}

export function logout() {
  return {
    type: 'RESET_STATE'
  };
}

export function setFetchedExpenses(expenseList) {
  return {
    type: 'SET_FETCHED_EXPENSES',
    expenses: expenseList
  }
}

export function storeSession(session) {
  try {
    AsyncStorage.setItem("@Expense:session", JSON.stringify(session)).then(() => {
      console.log('Session stored');
    })
  }
  catch (err) {
    console.error(err);
    Alert.alert("Unexpected", "Could not store token");
  }
}
