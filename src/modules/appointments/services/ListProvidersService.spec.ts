import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const johnDoe = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'passwor1',
    });

    const johnTre = await fakeUsersRepository.create({
      email: 'johntre@example.com',
      name: 'John Trê',
      password: 'password2',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'johnqua@example.com',
      name: 'John Qua',
      password: 'password3',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([johnDoe, johnTre]);
  });
});
