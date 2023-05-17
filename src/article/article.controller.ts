import { Controller, Get, Post, Put, Param, Body, Query, Delete} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaConnectionService } from 'src/prisma-connection/prisma-connection.service';
import { ArticleDto, ResponseArticleDto} from './article.dto';
import { randomUUID } from 'crypto';


@Controller('article')
export class ArticleController {
    constructor(private readonly dbconnection: PrismaConnectionService){}

     //this endpoint should get all the projects of a given user 
     @Get(":name")
     async getUserArticles(@Param("name") name: string){
         return await this.dbconnection.user.findFirst({where:{name: name}}).articles
     }
 
     // this endpoint should allow for the creation of a new project
     @Post(":name")
     async createArticle(@Param("name") name: string, @Body() project: ArticleDto){
         // first we check if the user exists or not
         const user = this.dbconnection.user.findFirst({where: {name: name}})
         if(user){
             const ArticleName = project.title
             const ArticleId = ArticleName + randomUUID().toString()
             await this.dbconnection.articles.create({
                 include:{user:true},
                 data:{...project, user: { connect: {name: name}}, articleId: ArticleId}
             })
         }
         else{
             throw new HttpException("User not found", HttpStatus.NOT_FOUND)
         }
     }
 
     // create an endpoint that can update a project
     @Put(':id')
     async updateArticle(@Param("id") id: string, @Body() projectUpdate: ArticleDto){
         const project = await this.dbconnection.articles.update({where:{articleId:id}, data:projectUpdate})
         const response: ResponseArticleDto ={...project}
         return response
 
     }
 
     // endpoint to delete a project 
     @Delete(':id')
     async deleteArticle(@Param("id") id: string){
         return this.dbconnection.articles.delete({where:{articleId: id}})
     }
}
