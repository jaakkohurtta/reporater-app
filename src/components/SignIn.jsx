import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  formContainer: {
    margin: 10,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            testID="usernameField"
            name="username"
            placeholder="username"
            style={styles.textInput}
          />
          <FormikTextInput
            testID="passwordField"
            name="password"
            placeholder="password"
            style={styles.textInput}
            secureTextEntry
          />
          <Pressable
            testID="submitButton"
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text
              color="white"
              backgroundColor="primary"
              fontSize="heading"
              fontWeight="bold"
            >
              Sign In
            </Text>
          </Pressable>
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const handleSubmit = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInForm handleSubmit={handleSubmit} />;
};

export default SignIn;
