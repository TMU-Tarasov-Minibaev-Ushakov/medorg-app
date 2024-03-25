import {Card, Col, Divider, Flex, Row, Space, Typography} from "antd";
import {FC} from "react";
import {Appointment} from "../../../../api/appointments/getMyAppointments";
import {AppointmentElement} from "../Appointment/Appointment";

type DayProps = {
  date: string,
  appointments: Appointment[],
  forDoctor?: boolean
}

export const Day: FC<DayProps> = ({
  date,
  appointments,
  forDoctor
}) => {
  const dateWithDayOfWeek = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (<Space direction={'vertical'} size={6} style={{width: '100%'}}>
    <Divider plain>{dateWithDayOfWeek}</Divider>
    {appointments.map((appointment: any) => {
      return <AppointmentElement date={date} appointment={appointment} key={appointment.date + appointment.hour} forDoctor />
    })}
  </Space>)
}