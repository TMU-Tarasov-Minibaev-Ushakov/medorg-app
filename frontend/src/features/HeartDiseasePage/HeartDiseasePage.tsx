import React, {useMemo, useState} from 'react';
import {Button, Card, Col, Divider, Form, Image, InputNumber, Modal, Radio, Row, Space, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {analyzeHearDisease} from "../../api/ml/analyzeHearDisease";

export type HeartDiseaseData = {
    Smoking: "Yes" | "No",
    AlcoholDrinking: "Yes" | "No",
    Stroke: "Yes" | "No",
    PhysicalHealth: number,
    MentalHealth: number,
    DiffWalking: "No" | "Yes",
    Sex: "Male" | "Female",
    Diabetic: "Yes" | "No",
    PhysicalActivity: "No" | "Yes",
    SleepTime: number,
    Asthma: "Yes" | "No",
    KidneyDisease: "Yes" | "No",
    SkinCancer: "Yes" | "No",
}

export const HeartDiseasePage = () => {

    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [analysis, setAnalysis] = useState<0 | 1>();

    const onSubmit = useMemo(() => async (values: HeartDiseaseData) => {

        console.log(values);
        try {
            const responseData = await analyzeHearDisease(values);
            console.log(responseData);
            setAnalysis(responseData);
            setResultModalVisible(true);
        }
        catch (e) {
            console.error(e)
        }
    }, []);

    return (
        <Space direction="vertical" size={16} style={{width: '100%'}}>
            <Modal footer={null} title="Results of analysis" open={resultModalVisible} onCancel={() => setResultModalVisible(false)}>
                {
                    analysis ? (
                      <Space direction='vertical' align='center' style={{ width: '100% '}}>
                          <img src={'/heart_bad.png'} width='128px'/>
                          <Typography.Title type='danger'>
                              This person is most likely to have a heart disease.
                          </Typography.Title>
                      </Space>
                    ) : (
                      <Space direction='vertical' align='center' style={{ width: '100% '}}>
                          <img src={'/heart_good.webp'} width='128px'/>
                          <Typography.Title type='success'>
                              The program didn't find any heart diseases, this person is most likely healthy.
                          </Typography.Title>
                      </Space>

                    )
                }
            </Modal>
            <Typography.Title level={3}>
                Heart disease analysis
            </Typography.Title>
            <Card>
                <Typography.Title level={4}>
                    Fill the form to analyze heart disease
                </Typography.Title>
                <Divider />
                <Form name="heartDiseaseForm" onFinish={onSubmit}>
                    <Row>
                        <Col span={8}>
                            <Form.Item name="Smoking" label='Smoking' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="AlcoholDrinking" label='Alcohol drinking' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="Stroke" label='Stroke' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="DiffWalking" label='Diff walking' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="PhysicalActivity" label='Physical activity' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="Asthma" label='Asthma' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="KidneyDisease" label='Kidney disease' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="SkinCancer" label='Skin cancer' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="Diabetic" label='Diabetic' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={6}>
                            <Form.Item name="PhysicalHealth" label='Physical health' rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="MentalHealth" label='Mental health' rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="SleepTime" label='Sleep time' rules={[{ required: true }]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="Sex" label='Sex' rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Button block htmlType="submit">Analyze</Button>
                </Form>
            </Card>
        </Space>
    );
};