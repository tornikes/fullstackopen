import { Formik } from "formik";
import { View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { FormContainer } from "./formComponents/FormContainer";
import FormButton from "./formComponents/FormButton";

function SignIn() {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  async function formSubmissionHandler(values) {
    try {
      await signIn(values);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return <SignInForm formSubmissionHandler={formSubmissionHandler} />;
}

export function SignInForm({ formSubmissionHandler }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .test("len", "Must be at least 8 characters", (val) => val.length > 5)
      .required("Password is required"),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={formSubmissionHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput placeholder="Username" name="username" />
            <FormikTextInput
              secureTextEntry
              placeholder="Password"
              name="password"
            />
            <FormButton label={"Sign In"} handlePress={handleSubmit} />
          </View>
        )}
      </Formik>
    </FormContainer>
  );
}

export default SignIn;
