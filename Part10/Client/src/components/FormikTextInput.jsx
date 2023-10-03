import { StyleSheet } from "react-native";
import { useField } from "formik";

import TTextInput from "./TTextInput";
import TText from "./TText";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.errorIndicator,
  },
});

function FormikTextInput({ name, ...props }) {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TTextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <TText style={styles.errorText}>{meta.error}</TText>}
    </>
  );
}

export default FormikTextInput;
