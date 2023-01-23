import { Citizen, CitizenSchema } from './entities/citizens.entity';
import { CitizenRepository } from './citizens.repository';
import { Module } from '@nestjs/common';
import { CitizenService } from './citizens.service';
import { CitizenController } from './citizens.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Citizen.name, schema: CitizenSchema }]),
  ],
  controllers: [CitizenController],
  providers: [CitizenService, CitizenRepository],
})
export class CitizenModule {}
