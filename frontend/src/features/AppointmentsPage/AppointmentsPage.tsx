import {Card, Col, Divider, Flex, Row, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {getMyImagesUrls} from "../../api/ml/getMyImagesUrls";
import {Appointment, getMyAppointments} from "../../api/appointments/getMyAppointments";



export const AppointmentsPage = () => {

  const [appointments, setAppointments] = useState<Appointment[]>();
  console.log(appointments);

  useEffect(() => {
    getMyAppointments().then(({appointments}) => setAppointments(appointments));
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

  // const filteredAppointments = appointments.filter(appointment => {
  //   // date is today or in the future
  //   return new Date(appointment.date) >= new Date();
  // });

  const appointmentsByDay = sortedByDateAndHourAppointments.reduce((acc, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {} as Record<string, any[]>);



  const statusToColor = (status: string) => {
    switch (status) {
      case 'planned':
        return '#FFD700';
      case 'completed':
        return '#32CD32';
      case 'canceled':
        // gray
        return '#A9A9A9';
    }
  };

  const appointmentsByDayElements = Object.entries(appointmentsByDay).map(([date, appointments]) => {
    const dateWithDayOfWeek = new Date(date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    return (
      <Space direction={'vertical'} size={6} key={date} style={{width: '100%'}}>
        <Divider plain>{dateWithDayOfWeek}</Divider>
          {appointments.map((appointment: any) => {
            return (
              <Card key={date + appointment.hour} >
                <Row>
                  <Col style={{ padding: '0 1em'}}>
                    <Flex align={'center'} style={{height: '100%'}}>
                      <div style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: statusToColor(appointment.status)}} />
                    </Flex>
                  </Col>
                  <Col>
                    <Divider type={'vertical'} />
                  </Col>
                  <Col style={{ padding: '0 1em'}}>
                    <Typography.Text strong style={{ fontSize: 18 }}>{appointment.hour}:00</Typography.Text>
                  </Col>
                  <Col>
                    <Divider type={'vertical'} />
                  </Col>
                  <Col style={{ padding: '0 1em'}}>
                    <Typography.Text style={{ fontSize: 18 }}>{`Doctor_${appointment.doctorId}`}</Typography.Text>
                  </Col>
                  <Col>
                    <Divider type={'vertical'} />
                  </Col>
                  <Col style={{ padding: '0 1em'}}>
                    <Typography.Text style={{ fontSize: 18 }}>{appointment.doctor.user.email}</Typography.Text>
                  </Col>
                </Row>
              </Card>
            )
          })}
      </Space>
    )
  });

  return (
    <Space direction={'vertical'} size={16} style={{width: '100%'}}>
      <Typography.Title level={3}>My appointments</Typography.Title>
      {appointmentsByDayElements}
    </Space>
  )
};