import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CfgModule } from '../configuration/cfg.module';
import { CfgService } from '../configuration/cfg.service';
import { AuthJwtService } from './auth-jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    JwtModule.registerAsync({
      imports: [ CfgModule ],
      inject: [ CfgService ],
      useFactory: (cfg: CfgService) => ({
        secret: cfg.APP_JWT_SECRET_KEY,
        signOptions: {
          expiresIn: cfg.APP_JWT_EXPIRATION_TIME,
        }
      }),
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthJwtService,
    UserRepository,
  ],
  exports: [
    AuthJwtService,
    JwtModule,
  ]
})
export class AuthModule {}
