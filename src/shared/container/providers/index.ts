import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiscStorageProvider from './StorageProvider/implementations/DiscStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiscStorageProvider,
);
