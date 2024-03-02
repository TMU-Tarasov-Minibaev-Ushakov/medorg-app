import React, {useState} from "react";
import {EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Flex, Form, Input, notification, Space} from "antd";
import {useNavigate} from "react-router-dom";

import {signUp, SignUpInput} from "../../api/auth/signUp";

import {AuthLayout} from "./components/AuthLayout/AuthLayout";
import {FormContainer} from "./components/AuthLayout/FormContainer";
import {useNotifications} from "../../contexts/NotificationsContext";
import {createDoctor} from "../../api/auth/createDoctor";

export const CreateDoctorPage = () => {
  const navigate = useNavigate();
  const { api } = useNotifications();
  const [backendValidationErrors, setBackendValidationErrors] =
    useState<Record<string, string | undefined>>({});

  const onSubmit = async (values: SignUpInput) => {
    try {
      setBackendValidationErrors({});
      const response = await createDoctor(values);

      console.log(response)

      if (response.createdUser) {
        api?.info({
          message: 'User successfully created',
          description: 'Now they can log in using the credentials'
        })
        return navigate('/users');
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
        newValidationErrors[errorField] = er.message;
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
      <FormContainer title="Create a doctor's account">
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
