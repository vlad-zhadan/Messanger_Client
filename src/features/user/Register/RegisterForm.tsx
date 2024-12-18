import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store/store";
import { Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined, InfoCircleOutlined, IdcardOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import './RegisterForm.css'

function RegisterForm() {
  const { userStore } = useStore();

  return (
    <div className="registerFormContainer">
      
      <div className="registerFormItem">
         <div className="formName">
          Register
        </div>
          <Formik
        initialValues={{ 
          user: {
            email: '',
            password: '',
          },
          profile: {
            firstName: '',
            lastName: '',
            tag: '',
            bio: '',
          },
          error: null,
      }}
        onSubmit={async (values, { setErrors }) => {
          try {
            await userStore.register(values);
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


            {/* First Name Field */}
            <div className="form-item">
              <Field name="profile.firstName">
                {({ field }: any) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined />}
                    placeholder="First Name"
                  />
                )}
              </Field>
              {errors.profile?.firstName && touched.profile?.firstName && (
                <div className="error-message">{errors.profile.firstName}</div>
              )}
            </div>

            {/* Last Name Field */}
            <div className="form-item">
              <Field name="profile.lastName">
                {({ field }: any) => (
                  <Input
                    {...field}
                    prefix={<IdcardOutlined />}
                    placeholder="Last Name (Optional)"
                  />
                )}
              </Field>
              {errors.profile?.lastName && touched.profile?.lastName && (
                <div className="error-message">{errors.profile.lastName}</div>
              )}
            </div>

            {/* Tag Field */}
            <div className="form-item">
              <Field name="profile.tag">
                {({ field }: any) => (
                  <Input
                    {...field}
                    prefix={<InfoCircleOutlined />}
                    placeholder="Tag"
                  />
                )}
              </Field>
              {errors.profile?.tag && touched.profile?.tag && (
                <div className="error-message">{errors.profile.tag}</div>
              )}
            </div>

            {/* Bio Field */}
            <div className="form-item">
              <Field name="profile.bio">
                {({ field }: any) => (
                  <Input.TextArea
                    {...field}
                    prefix={<InfoCircleOutlined />}
                    placeholder="Bio (Optional)"
                    rows={4}
                    className="bioContainer"
                  />
                )}
              </Field>
              {errors.profile?.bio && touched.profile?.bio && (
                <div className="error-message">{errors.profile.bio}</div>
              )}
            </div>


            {/* Email Field */}
            <div className="form-item">
              <Field name="user.email">
                {({ field }: any) => (
                  <Input
                    {...field}
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    type="email"
                  />
                )}
              </Field>
              {errors.user?.email && touched.user?.email && (
                <div className="error-message">{errors.user.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-item">
              <Field name="user.password">
                {({ field }: any) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                )}
              </Field>
              {errors.user?.password && touched.user?.password && (
                <div className="error-message">{errors.user.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <FormItem
            className="submetFormItem">
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                block
              >
                Register
              </Button>
            </FormItem>
          </Form>
        )}
      </Formik>
      </div>
    </div>
    
  );
};

export default observer(RegisterForm);

