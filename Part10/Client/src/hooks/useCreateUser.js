import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

function useCreateUser() {
  const [mutate, result] = useMutation(CREATE_USER);

  async function createUser(user) {
    try {
      const response = await mutate({
        variables: {
          user,
        },
      });

      return response?.data?.createUser?.id;
    } catch (err) {
      console.log(err);
    }
  }

  return [createUser, result];
}

export default useCreateUser;
