import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConnectionService } from './prisma-connection/prisma-connection.service';
import { UserController } from './user/user.controller';
import { ProjectController } from './project/project.controller';
import { ArticleController } from './article/article.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProjectController, ArticleController],
  providers: [AppService, PrismaConnectionService],
})
export class AppModule {}
