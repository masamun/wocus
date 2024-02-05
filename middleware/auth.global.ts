import { userAuth } from "~~/composables/userAuth"

export default defineNuxtRouteMiddleware((to, from) => {
  if (!userAuth() && to.path !== "/") {
    return navigateTo('/')
  }
})