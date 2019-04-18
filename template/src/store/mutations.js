export default {
  LOGIN(state, { token }) {
    localStorage.setItem('token', token)
    state.token = token
  },
  LOGOUT(state) {
    localStorage.removeItem('token')
    state.token = null
  }
}
