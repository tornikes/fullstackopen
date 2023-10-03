import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

function useSignIn() {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  async function signIn({ username, password }) {
    const response = await mutate({
      variables: { credentials: { username, password } },
    });
    const token = response?.data?.authenticate?.accessToken;
    authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return token;
  }

  return [signIn, result];
}

export default useSignIn;
