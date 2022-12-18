import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class createNotificationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    type: 'UUID',
  })
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
