import {Button, Card, Col, Divider, Flex, Row, Space, Typography} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {Appointment, getMyAppointments} from "../../api/appointments/getMyAppointments";
import {PlusOutlined} from "@ant-design/icons";
import {CreateAppointmentWindow} from "./components/CreateAppointmentWindow";
import {Day} from "./components/Day/Day";

export const AppointmentsPage = () => {

  const [appointments, setAppointments] = useState<Appointment[]>();
  const [createAppointmentModal, setCreateAppointmentModal] = useState(false);

  const openModal = useCallback(() => {
    setCreateAppointmentModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setCreateAppointmentModal(false);
  }, [])

  useEffect(() => {
    const from = new Date();
    from.setDate(new Date().getDate() - 1)
    getMyAppointments({
      fromDateString: new Date().toISOString().substring(0,10)
    }).then(({appointments}) => setAppointments(appointments));
  }, []);

  if (!appointments) {
    return <div>Loading...</div>;
  }

  const sortedByDateAndHourAppointments = appointments.sort((a, b) => {
    if (a.date === b.date) {
      return a.hour - b.hour;
    }
    return new Date(a.date) > new Date(b.date) ? 1 : -1;
  });

  const appointmentsByDay = sortedByDateAndHourAppointments.reduce((acc, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const appointmentsElements = Object.entries(appointmentsByDay).map(([date, appointments]) => {
    return <Day appointments={appointments} date={date} key={date} />
  });

  return (
    <Space direction={'vertical'} size={16} style={{width: '100%'}}>
      <CreateAppointmentWindow open={createAppointmentModal} onCancel={closeModal} />
      <Flex justify='space-between'>
        <Typography.Title level={3}>My appointments</Typography.Title>
        <Button icon={<PlusOutlined />} type='primary' onClick={openModal}>Create new appointment</Button>
      </Flex>
      {appointmentsElements}
    </Space>
  )
};