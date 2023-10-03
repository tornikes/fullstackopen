import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    return AsyncStorage.getItem(`${this.namespace}:token`);
  }

  setAccessToken(token) {
    return AsyncStorage.setItem(`${this.namespace}:token`, token);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
