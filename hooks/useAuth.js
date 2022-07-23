import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  auth,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "../firebase";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

const config = {
  iosClientId:
    "156899514774-7vpo0cnujjfeg50k873rb07ulv9t64k6.apps.googleusercontent.com",
  androidClientId:
    "156899514774-08f3snphojka0ts4fmespsdk67enqri3.apps.googleusercontent.com",
  expoClientId:
    "156899514774-tbbddegdpu3h3a2n5kv8islnjkvkj978.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [resquest, response, promptAsync] = Google.useAuthRequest(config);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadingInitial(false);
    });
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { idToken, accessToken } = response?.authentication;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithCredential(auth, credential);
    } else {
      setError(response?.error);
    }

    setLoading(false);
  }, [response]);

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      signinWithGoogle: () => {
        setLoading(true);
        promptAsync({ showInRevents: true });
      },
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
