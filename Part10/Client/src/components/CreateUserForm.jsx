import { Formik } from "formik";
import { FormContainer } from "./formComponents/FormContainer";
import useCreateUser from "../hooks/useCreateUser";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import FormButton from "./formComponents/FormButton";
import useSignIn from "../hooks/useSignIn";

function CreateUser() {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  async function submitUser(userData) {
    const { confirmPassword: _, ...user } = userData;
    try {
      await createUser(user);
      await signIn(user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return <CreateUserForm formSubmissionHandler={submitUser} />;
}

function CreateUserForm({ formSubmissionHandler }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required("User name is required").min(5).max(30),
    password: yup.string().required("Password is required").min(5).max(30),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirming the password is required"),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={formSubmissionHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="User Name" />
            <FormikTextInput
              secureTextEntry
              name="password"
              placeholder="Password"
            />
            <FormikTextInput
              secureTextEntry
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <FormButton label="Sign Up" handlePress={handleSubmit} />
          </View>
        )}
      </Formik>
    </FormContainer>
  );
}

export default CreateUser;
