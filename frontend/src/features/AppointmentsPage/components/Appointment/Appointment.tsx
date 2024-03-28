import {Button, Card, Col, Divider, Flex, Typography} from "antd";
import {Appointment} from "../../../../api/appointments/getMyAppointments";
import {FC, useCallback} from "react";
import {cancelAppointment} from "../../../../api/appointments/cancelAppointment";
import {useNotifications} from "../../../../contexts/NotificationsContext";

type AppointmentProps = {
  date: string,
  appointment: Appointment,
  forDoctor: boolean
}

const statusToColor = (status: string) => {
  switch (status) {
    case 'planned':
      return '#FFD700';
    case 'completed':
      return '#32CD32';
    case 'cancelled':
      return '#f17f7f';
  }
};

export const AppointmentElement: FC<AppointmentProps> = ({ date, appointment, forDoctor }) => {

  const { api } = useNotifications();

  const onCancel = useCallback(async () => {
    try {
      const res = await cancelAppointment(appointment.id)
      console.log(res)
      api?.success({
        message: res.message
      });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }

  }, [api, appointment.id])

  return (<Card key={date + appointment.hour} style={appointment.status === 'cancelled' ? {
    opacity: 0.6
  } : undefined}>
    <Flex gap={'middle'}>
      <Col style={{padding: '0 1em'}}>
        <Flex align={'center'} style={{height: '100%'}}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: statusToColor(appointment.status)
          }}/>
        </Flex>
      </Col>
      <Col>
        <Divider type={'vertical'}/>
      </Col>
      <Col style={{padding: '0 1em'}}>
        <Typography.Text strong style={{fontSize: 18}}>{appointment.hour}:00</Typography.Text>
      </Col>
      <Col>
        <Divider type={'vertical'}/>
      </Col>
      <Col style={{padding: '0 1em'}}>
        <Typography.Text style={{fontSize: 18}}>{forDoctor ? `User_${appointment.patientId}` : `Doctor_${appointment.doctorId}`}</Typography.Text>
      </Col>
      <Col>
        <Divider type={'vertical'}/>
      </Col>
      <Col style={{padding: '0 1em'}}>
        <Typography.Text style={{fontSize: 18}}>{forDoctor ? appointment.patient.user.email : appointment.doctor.user.email}</Typography.Text>
      </Col>
      { appointment.status !== 'cancelled' ?
        <Col style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <Button type='default' danger onClick={onCancel}>Cancel</Button>
        </Col> : null
      }
    </Flex>
  </Card>)
}