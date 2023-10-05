import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    backgroundColor: "white",
  },
});

export function FormContainer({ children }) {
  return <View style={styles.formContainer}>{children}</View>;
}
