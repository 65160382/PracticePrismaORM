import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UsersModule, 
    PrismaModule, BoardModule, TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
