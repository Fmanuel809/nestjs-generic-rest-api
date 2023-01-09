import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Dto {
  @AutoMap()
  @ApiPropertyOptional({
    type: String,
  })
  _id?: string;

  @AutoMap()
  @ApiPropertyOptional({
    type: Boolean,
  })
  active?: boolean;
}
