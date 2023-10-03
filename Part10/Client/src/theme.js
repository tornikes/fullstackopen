import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appbarBackground: "#24292e",
    mainBackground: "#e1e4e8",
    errorIndicator: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.OS === "android" ? "Roboto" : "Arial",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
