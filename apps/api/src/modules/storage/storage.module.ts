import { Global, Module } from '@nestjs/common';

import { IMAGE_STORAGE } from './image-storage.port';
import { LocalImageStorage } from './local-image-storage.adapter';

/**
 * Global storage module — wires the IMAGE_STORAGE port to the local
 * filesystem adapter. Swap the `useClass` for an S3 / MinIO adapter
 * later without touching consumers.
 */
@Global()
@Module({
  providers: [
    {
      provide: IMAGE_STORAGE,
      useClass: LocalImageStorage,
    },
    LocalImageStorage,
  ],
  exports: [IMAGE_STORAGE],
})
export class StorageModule {}
