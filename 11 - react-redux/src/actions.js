/*
 * action types
 */
export const ADD_NUMBER = 'ADD_NUMBER';
export const DEC_NUMBER = 'DEC_NUMBER';

/*
 * action creators
 */
export function addNumber(value) {
  return { type: ADD_NUMBER, value }
}

export function decNumber(value) {
  return { type: DEC_NUMBER, value }
}
