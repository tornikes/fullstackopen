import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  errorState: {
    borderColor: theme.colors.errorIndicator,
  },
  formInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 5,
    fontSize: 15,
    padding: 10,
  },
});

function TextInput({ style, error, ...props }) {
  const textInputStyle = [style, styles.formInput, error && styles.errorState];

  return <NativeTextInput style={textInputStyle} {...props} />;
}

export default TextInput;
