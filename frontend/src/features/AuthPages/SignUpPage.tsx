import React, { useState } from "react";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, KeyOutlined } from "@ant-design/icons";
import { Space, Input, Flex, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";

import { SignUpInput, signUp } from "../../api/auth/signUp";

import { AuthLayout } from "./components/AuthLayout/AuthLayout";
import { FormContainer } from "./components/AuthLayout/FormContainer";
import {useNotifications} from "../../contexts/NotificationsContext";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { api } = useNotifications();
  const [backendValidationErrors, setBackendValidationErrors] =
    useState<Record<string, string | undefined>>({});

  const onSubmit = async (values: SignUpInput) => {
    localStorage.removeItem('authToken');
    try {
      setBackendValidationErrors({});
      const response = await signUp(values);

      console.log(response)

      if (response.createdUser) {
        api?.info({
          message: 'User successfully created',
          description: 'Now you can log in using your credentials'
        })
        return navigate('/sign-in');
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
      <FormContainer title="Create an account">
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
              <Button size="large" style={{ flexGrow: 1 }} onClick={() => navigate('/sign-in')}>
                I have an account
              </Button>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                style={{ flexGrow: 1 }}
              >
                Create account
              </Button>
            </Flex>
          </Space>
        </Form>
      </FormContainer>
    </AuthLayout>
  );
};
