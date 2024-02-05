import { provideApolloClient, useApolloClient } from "@vue/apollo-composable";

/**
 * setup以外でuseMutationが使えるようにprovideする
 * https://github.com/nuxt-modules/apollo/issues/444#issuecomment-1354571194
 */
export default defineNuxtPlugin(() => {
  const ac = useApolloClient();
  const clients = useApollo()?.clients;
  if (clients) {
    provideApolloClient(clients.default);
  }
});
