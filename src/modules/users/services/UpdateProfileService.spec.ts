import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non existing user id',
        name: 'non existing user name',
        email: 'non existing user email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email to an already taken one', async () => {
    const johnDoe = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    });

    const johnTre = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: johnTre.id,
        name: 'John Trê',
        email: johnDoe.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: 'new password',
      old_password: 'password',
    });

    expect(updatedUser.password).toBe('new password');
  });

  it('should not be able to update the password without the old one', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: 'new password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: 'new password',
        old_password: 'wrong old password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
