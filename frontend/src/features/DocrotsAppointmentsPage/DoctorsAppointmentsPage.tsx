import {Flex, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {Appointment} from "../../api/appointments/getMyAppointments";
import {Day} from "../AppointmentsPage/components/Day/Day";
import {getDoctorsAppointments} from "../../api/appointments/getDoctorsAppointments";
import {getDoctorByUserId} from "../../api/doctors/getDoctorByUserId";
import {useUserInfo} from "../../contexts/UserInfoContext";

export const DoctorsAppointmentsPage = () => {

  const [appointments, setAppointments] = useState<Appointment[]>();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo) return;

    const from = new Date();
    from.setDate(new Date().getDate() - 1)

    getDoctorByUserId(userInfo.id).then(res => {
      getDoctorsAppointments({
        doctorId: res.doctor.id,
        fromDateString: new Date().toISOString().substring(0,10)
      }).then(({appointments}) => setAppointments(appointments));
    }).catch(err => console.error(err));
  }, [userInfo]);

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
    return <Day appointments={appointments} date={date} key={date} forDoctor={true} />
  });

  return (
    <Space direction={'vertical'} size={16} style={{width: '100%'}}>
      <Flex justify='space-between'>
        <Typography.Title level={3}>My appointments</Typography.Title>
      </Flex>
      {appointmentsElements}
    </Space>
  )
};