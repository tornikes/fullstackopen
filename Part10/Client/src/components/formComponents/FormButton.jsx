import { View, Pressable, StyleSheet } from "react-native";
import TText from "../TText";

const styles = StyleSheet.create({
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

function FormButton({ label, handlePress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.submitButton} onPress={handlePress}>
        <TText style={styles.buttonText}>{label}</TText>
      </Pressable>
    </View>
  );
}

export default FormButton;
