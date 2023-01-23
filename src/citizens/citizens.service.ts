import { removeEmptyProps } from './../shared/utils';
import { Injectable } from '@nestjs/common';
import { CitizenRepository } from './citizens.repository';

type CitizenQuery = {
  cedula: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
};

@Injectable()
export class CitizenService {
  constructor(private readonly repository: CitizenRepository) {}

  async findAll(req: CitizenQuery) {
    const filter = removeEmptyProps(req);
    return this.repository.findAll(filter);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async findOne(query: any) {
    return this.repository.findOne(query);
  }
}
