import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0,
      city: {},
      todo: {title:''}
    }),
    mutations: {
      increment (state) {
        console.log('increment')
        state.counter++
      },
      setCity (state, payload) {
        state.city = payload
      },
      setTodo (state, payload) {
        state.todo = payload
      }
    }
  })
}

export default createStore
