import { createSlice } from "@reduxjs/toolkit"
import backendApi from "./api"
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    isAuthenticated: !!localStorage.getItem("access"),
    user: {},
    mode: "dark",
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      state.access = null
      state.isAuthenticated = false
      state.user = {}
    },
    switchTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark"
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      backendApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access
        state.refresh = payload.refresh
        state.isAuthenticated = true
        localStorage.setItem("access", payload.access)
        localStorage.setItem("refresh", payload.refresh)
      },
    )
    builder.addMatcher(
      backendApi.endpoints.verify.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access
        state.refresh = payload.refresh
        state.isAuthenticated = true
        localStorage.setItem("access", payload.access)
        localStorage.setItem("refresh", payload.refresh)
      },
    )
    builder.addMatcher(
      backendApi.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access
        state.refresh = payload.refresh
        state.isAuthenticated = true
        localStorage.setItem("access", payload.access)
        localStorage.setItem("refresh", payload.refresh)
      },
    )
  },
})

export const { logout, switchTheme } = authSlice.actions

export default authSlice.reducer
