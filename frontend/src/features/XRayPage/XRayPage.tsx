import React, {useMemo} from 'react';
import {Button, Form, Space, Typography, Upload} from "antd";
import {XrayImagesList} from "./components/XrayImagesList";
import {InboxOutlined} from "@ant-design/icons";
import {uploadXRayImage} from "../../api/ml/uploadXRayImage";
import {useNavigate} from "react-router-dom";

export const XRayPage = () => {

    const navigate = useNavigate();

    const onSubmit = useMemo(() => async (values: any) => {

        console.log(values);
        try {
            const responseData = await uploadXRayImage(values.xRayImageFile.file.originFileObj, localStorage.getItem('authToken') ?? '');
            console.log(responseData);
            navigate(0);
        }
        catch (e) {
            console.error(e)
        }
    }, []);

    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
            <Typography.Title level={3}>
                Your fluorography images
            </Typography.Title>
            <Form name="xRayUploadForm" onFinish={onSubmit}>
                <Form.Item name="xRayImageFile">
                    <Upload.Dragger style={{width: '100%'}}>
                        <InboxOutlined style={{ fontSize: 64 }}/>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <Button block htmlType="submit">Upload</Button>
            </Form>
            <XrayImagesList/>
        </Space>
    );
};