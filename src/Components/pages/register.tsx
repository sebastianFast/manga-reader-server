import gql from "graphql-tag";
import React, { useState,useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

import { useForm } from "../../utils/hooks"

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const context = useContext(AuthContext)
 
  const navigate = useNavigate();

  const [errors, setErrors] = useState<unknown>({});

  const {onChange, onSubmit, values} = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data: { register: userData }}) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions?.errors);
    },
    variables: values,
  });

 

  function registerUser() {
    addUser();
  }

  if(context.user){
    return <Navigate to={"/"} replace />
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username.."
          name="username"
          value={(values as any).username}
          error={(errors as any).username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="email"
          label="Email"
          placeholder="Email.."
          name="email"
          value={(values as any).email}
          error={(errors as any).email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password.."
          name="password"
          value={(values as any).password}
          error={(errors as any).password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={(values as any).confirmPassword}
          error={(errors as any).confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors as string).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors as string).map((value): any => (
              <li key={value as string}>{value as string}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
