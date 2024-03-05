import {Button, DatePicker, Flex, Modal, Select, Space} from "antd";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getDoctorsAppointments} from "../../../../api/appointments/getDoctorsAppointments";
import {Appointment} from "../../../../api/appointments/getMyAppointments";
import {Doctor, getDoctors} from "../../../../api/doctors/getDoctors";
import {createAppointment} from "../../../../api/appointments/createAppointment";
import {useNotifications} from "../../../../contexts/NotificationsContext";

type CreateAppointmentWindowProps = {
  open: boolean;
  onCancel: () => void;
};


export const CreateAppointmentWindow = ({ open, onCancel }: CreateAppointmentWindowProps) => {
  const { api } = useNotifications();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([])

  const [date, setDate] = useState<string | null>(null)
  const [hour, setHour] = useState<number | null>(null)

  useEffect(() => {
    getDoctors().then(({doctors}) => {
      console.log(doctors);
      setDoctors(doctors);
    });
  }, []);

  useEffect(() => {
    if (!selectedDoctor || !date) {
      return;
    }
    getDoctorsAppointments({
      doctorId: selectedDoctor,
      fromDateString: date,
      toDateString: date
    }).then((appointments) => {
      console.log(appointments);
      setDoctorAppointments(appointments.appointments);
    });
  }, [selectedDoctor, date]);

  const handleCreateAppointment = useCallback(async () => {
    console.log({
      selectedDoctor,
      date,
      hour
    });
    if (!selectedDoctor || !date || hour === null) {
      return;
    }

    try {
      const response = await createAppointment({
        doctorId: selectedDoctor,
        date,
        hour
      })
      console.log(response);

      if (response.error) {
        api?.error({
          message: 'Something went wrong!',
          description: response.error.message ?? 'Unexpected error occurred, please try again',
        });
      }

      if (!response.error) {
        api?.info({
          message: 'Appointment successfully created',
        });
        window.location.reload();
      }
    } catch (error) {
      api?.error({
        message: 'Something went wrong!',
        description: 'Unexpected error occurred, please try again',
      });
    }
  }, [selectedDoctor, date, hour, api, onCancel]);

  const onDateChange = useCallback((_: any, dateString: string) => {
    console.log(dateString);
    setDate(dateString);
  }, []);

  const doctorSelectOptions = useMemo(() => {
    return doctors?.map(doctor => {
      return {
        label: doctor.user.email,
        value: doctor.id
      };
    });
  }, [doctors]);

  const hoursElements = useMemo(() => {
    if (!date) {
      return null;
    }
    return Array.from({ length: 24 }).map((_, index) => {
      // hour should be at least 2 hours in the future
      const dateToCheck = new Date(date);
      dateToCheck.setHours(index);
      const minimumDate = new Date();
      minimumDate.setHours(minimumDate.getHours() + 2);
      const isAtLeast2HoursInTheFuture = dateToCheck > minimumDate;

      // hour should be in the working hours
      const isWorkingHour = index >= 8 && index <= 17;

      return (
        <Button
          style={{ flex: 1, opacity: !isWorkingHour ? 0.7 : 1}}
          key={index}
          type={hour === index ? 'primary' : !isWorkingHour ? 'dashed' : undefined}
          onClick={() => {
            console.log(index);
            setHour(index)
          }}
          disabled={
            !isWorkingHour || !isAtLeast2HoursInTheFuture || doctorAppointments.some((appointment: Appointment) => appointment.hour === index)
          }>
          {index}:00
        </Button>
      );
    })
  }, [doctorAppointments, hour]);

  return (
    <Modal title={'Create new appointment'} open={open} onCancel={onCancel} onOk={handleCreateAppointment} okButtonProps={{
      disabled: !selectedDoctor || !date || hour === null
    }}>
      <Space direction={'vertical'} style={{ width: '100%'}}>
        <Flex gap={8}>
          <Select
            style={{ flexGrow: 1 }}
            showSearch
            placeholder="Select a doctor"
            onChange={setSelectedDoctor}
            filterOption={(inputValue, option) => {
              return !!option?.label?.toString().toLowerCase().includes(inputValue.toLowerCase());
            }}
            options={doctorSelectOptions}
          />
          <DatePicker
            style={{ flexGrow: 1 }}
            onChange={onDateChange}
          />
        </Flex>
        <Flex gap={8} wrap='wrap'>
          {
            selectedDoctor && date
              ? hoursElements : null
          }
        </Flex>
      </Space>
    </Modal>
  );
};