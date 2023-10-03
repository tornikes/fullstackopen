import { Formik } from "formik";
import { View, StyleSheet, Pressable } from "react-native";
import TText from "./TText";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  formInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 5,
    paddingVertical: 10,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#0275d8",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
});

function SignIn() {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .test("len", "Must be at least 8 characters", (val) => val.length > 5)
      .required("Password is required"),
  });

  function formSubmissionHandler(values) {
    console.log(values);
  }

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={formSubmissionHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              placeholder="Username"
              name="username"
              style={styles.formInput}
            />
            <FormikTextInput
              secureTextEntry
              placeholder="Password"
              name="password"
              style={styles.formInput}
            />
            <View style={styles.buttonContainer}>
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <TText style={styles.buttonText}>Sign In</TText>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default SignIn;
