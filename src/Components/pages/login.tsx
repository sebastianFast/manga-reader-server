import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../context/auth";

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Login = () => {
  const context = useContext(AuthContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<unknown>({});
  const loginUserCallback = (e: any): void => {
    loginUser();
  };
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) {
      context.login(userData)
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions?.errors);
    },
    variables: values,
  });

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
          type="password"
          label="Password"
          placeholder="Password.."
          name="password"
          value={(values as any).password}
          error={(errors as any).password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Log In
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
