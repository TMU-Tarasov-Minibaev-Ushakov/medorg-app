import React, { useState } from "react";
import { Button, Flex, Form, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { SignInInput, signIn } from "../../api/auth/signIn";

import { AuthLayout } from "./components/AuthLayout/AuthLayout";
import { FormContainer } from "./components/AuthLayout/FormContainer";
import {useNotifications} from "../../contexts/NotificationsContext";
import {useUserInfo} from "../../contexts/UserInfoContext";

export const SignInPage = () => {
  const navigate = useNavigate();
  const {api} = useNotifications()
  const [backendValidationErrors, setBackendValidationErrors] =
    useState<Record<string, string | undefined>>({});
  const { fetchUserInfo } = useUserInfo();

  const onSubmit = async (values: SignInInput) => {
    localStorage.removeItem('authToken');
    try {
      setBackendValidationErrors({});
      const response = await signIn(values);

      console.log(response)

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        await fetchUserInfo();
        window.location.assign('/');
      }

      if (!response.error) {
        return api?.error({
          message: 'Something went wrong!',
          description: 'Unexpected error occurred, please try again',
        });
      }

      if (!response.error.data) {
        return api?.error({
          message: response.error.message,
        });
      }

      const newValidationErrors: Record<string, string | undefined> = {};
      response.error.data.errors.forEach((er) => {
        const errorField = er.path[er.path.length - 1];
        const errorMessage = er.message;
        newValidationErrors[errorField] = errorMessage;
      });
      setBackendValidationErrors(newValidationErrors);

    } catch (error) {
      api?.error({
        message: 'Something went wrong!',
        description: 'Unexpected error occurred, please try again',
      });
    }
  };

  return (
    <AuthLayout>
      <FormContainer title="Sign in">
        <Form name="basic" onFinish={onSubmit}>
          <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
            <div>
              <Form.Item<string> 
                name="email" 
                validateStatus={backendValidationErrors['email'] ? 'error' : 'validating'}
                help={backendValidationErrors['email']}>
                <Input
                  size="large"
                  placeholder="Email"
                  prefix={<UserOutlined style={{ marginRight: "0.5em" }} />}
                />
              </Form.Item>
              <Form.Item<string>
                name="password"
                validateStatus={backendValidationErrors['password'] ? 'error' : 'validating'}
                help={backendValidationErrors['password']}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone style={{ marginLeft: "0.5em" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ marginLeft: "0.5em" }} />
                    )
                  }
                  prefix={<KeyOutlined style={{ marginRight: "0.5em" }} />}
                />
              </Form.Item>
            </div>
            <Flex gap="small" wrap="nowrap">
              <Button size="large" style={{ flexGrow: 1 }} onClick={() => navigate('/sign-up')}>
                I don't have an account
              </Button>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                style={{ flexGrow: 1 }}
              >
                Log in
              </Button>
            </Flex>
          </Space>
        </Form>
      </FormContainer>
    </AuthLayout>
  );
};
