import AppError from '@shared/errors/AppError';

import FakeAppointmnetsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmnetsRepository = new FakeAppointmnetsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmnetsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'popo',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('popo');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmnetsRepository = new FakeAppointmnetsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmnetsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'popo',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'popo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
