import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class getOrdersQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(40)
  @MaxLength(42)
  @ApiProperty({ required: false })
  tokenA?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(40)
  @MaxLength(42)
  @ApiProperty({ required: false })
  tokenB?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(40)
  @MaxLength(42)
  @ApiProperty({ required: false })
  user?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  active?: boolean;
}

export class getMatchingOrdersQueryDto {
  @IsNotEmpty()
  @MinLength(40)
  @MaxLength(42)
  @ApiProperty({ required: true })
  tokenA?: string;

  @IsNotEmpty()
  @MinLength(40)
  @MaxLength(42)
  @ApiProperty({ required: true })
  tokenB?: string;

  @IsNotEmpty()
  @MinLength(0)
  @MaxLength(28)
  @ApiProperty({ required: true })
  amountA?: number;

  @IsNotEmpty()
  @MinLength(0)
  @MaxLength(28)
  @ApiProperty({ required: true })
  amountB?: number;
}
