import { userAuth } from "~~/composables/userAuth";

export default defineNuxtRouteMiddleware((to) => {
  if (!userAuth() && to.path !== "/") {
    return navigateTo("/");
  }
});
