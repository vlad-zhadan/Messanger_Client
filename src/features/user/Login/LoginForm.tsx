import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store/store";
import { Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import './LoginForm.css'
import { Link } from "react-router-dom";


function LoginForm() {
  const { userStore } = useStore();

  return (
    <div className="formContainer">
      <div className="formItem">
        <div className="formName">
          Log In
        </div>
        <Formik
          initialValues={{ email: "", password: "", error: null }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await userStore.login(values);
            } catch (error) {
              setErrors({ error: "Invalid email or password" });
            }
          }}
          className="loginForm"
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <Form
              className="login-form"
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{ maxWidth: "300px", margin: "0 auto" }}
              
            >
              {/* Display error message if login fails */}
              {errors.error && (
                <Alert
                  message={errors.error}
                  type="error"
                  showIcon
                  style={{ marginBottom: "16px" }}
                />
              )}


              {/* Email Field */}
              <FormItem
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
                help={touched.email && errors.email ? errors.email : null}
              >
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      prefix={<MailOutlined />}
                      placeholder="Email"
                      type="email"
                    />
                  )}
                </Field>
              </FormItem>

              {/* Password Field */}
              <FormItem
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
                help={
                  touched.password && errors.password ? errors.password : null
                }
              >
                <Field name="password">
                  {({ field }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  )}
                </Field>
              </FormItem>

              {/* Submit Button */}
              <FormItem className="loginButton">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginFormButton"
                  block
                >
                  Log in
                </Button>
              </FormItem>
                
              <Link to='/register' className="linkToRegister">
                        Do you have an account ?
                    </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    
  );
};

export default observer(LoginForm);

