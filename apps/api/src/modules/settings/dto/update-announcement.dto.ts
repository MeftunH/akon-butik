import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl, MaxLength, ValidateIf } from 'class-validator';

/**
 * Body DTO for `PUT /admin/settings/announcement`. Mirrors the public
 * announcement shape with class-validator wired to enforce the admin-side
 * UX rules:
 *   - `message` is required when `enabled === true`
 *   - `linkLabel` is required when a `linkUrl` is provided (and vice versa)
 *
 * All optional fields accept `null` so the admin form can clear a previously
 * stored value with a single PUT.
 */
export class UpdateAnnouncementDto {
  @ApiPropertyOptional({ nullable: true, maxLength: 240 })
  @ValidateIf((o: UpdateAnnouncementDto) => o.enabled === true || typeof o.message === 'string')
  @IsString()
  @MaxLength(240)
  message!: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @ValidateIf((o: UpdateAnnouncementDto) => typeof o.linkUrl === 'string' && o.linkUrl.length > 0)
  @IsString()
  @IsUrl({ require_protocol: true, require_tld: false }, { message: 'Geçerli bir URL girin' })
  @MaxLength(500)
  linkUrl!: string | null;

  @ApiPropertyOptional({ nullable: true, maxLength: 60 })
  @ValidateIf((o: UpdateAnnouncementDto) => typeof o.linkUrl === 'string' && o.linkUrl.length > 0)
  @IsString()
  @MaxLength(60)
  linkLabel!: string | null;

  @ApiProperty()
  @IsBoolean()
  enabled!: boolean;
}
