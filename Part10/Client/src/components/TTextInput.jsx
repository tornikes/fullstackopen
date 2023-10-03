import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  errorState: {
    borderColor: theme.colors.errorIndicator,
  },
});

function TextInput({ style, error, ...props }) {
  const textInputStyle = [style, error && styles.errorState];

  return <NativeTextInput style={textInputStyle} {...props} />;
}

export default TextInput;
