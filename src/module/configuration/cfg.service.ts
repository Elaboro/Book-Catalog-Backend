import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CfgService {

  constructor(
    private configService: ConfigService,
  ) {}

  get APP_PORT(): number {
    const value = this.configService.get("APP_PORT");
    return Number(value);
  }

  get APP_POSTGRES_HOST(): string {
    const value = this.configService.get("APP_POSTGRES_HOST");
    return String(value);
  }

  get APP_POSTGRES_PORT(): number {
    const value = this.configService.get("APP_POSTGRES_PORT");
    return Number(value);
  }

  get APP_POSTGRES_USERNAME(): string {
    const value = this.configService.get("APP_POSTGRES_USERNAME");
    return String(value);
  }

  get APP_POSTGRES_PASSWORD(): string {
    const value = this.configService.get("APP_POSTGRES_PASSWORD");
    return String(value);
  }

  get APP_POSTGRES_DATABASE(): string {
    const value = this.configService.get("APP_POSTGRES_DATABASE");
    return String(value);
  }

  get APP_POSTGRES_LOGGING(): boolean {
    const value = this.configService.get("APP_POSTGRES_LOGGING");
    return (value?.toLowerCase() === "true");
  }

  get APP_JWT_SECRET_KEY(): string {
    const value = this.configService.get("APP_JWT_SECRET_KEY");
    return String(value);
  }

  get APP_JWT_EXPIRATION_TIME(): string {
    const value = this.configService.get("APP_JWT_EXPIRATION_TIME");
    return String(value);
  }
}
