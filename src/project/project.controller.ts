import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpStatus, HttpException} from '@nestjs/common';
import { PrismaConnectionService } from 'src/prisma-connection/prisma-connection.service';
import { ProjectDto, ResponseProjectDto} from './project.dto';
import { randomUUID } from 'crypto';



@Controller('projects')
export class ProjectController {
    constructor(private readonly dbconnection: PrismaConnectionService){}

    //this endpoint should get all the projects of a given user 
    @Get(":name")
    async getUserProjects(@Param("name") name: string){
        // we can use this endpoint to search based on text in the description
        // technologies used 
        const user = this.dbconnection.user.findFirst({where: {name: name}})
        if(user){
            const response = await this.dbconnection.user.findFirst({where:{name: name}}).projects()
            console.log(response)
            return response
        }
        else{
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
    }

    //this endpoint should get a specific project of a user based on the userId 
    @Get(":name/:projectId")
    async getProject(@Param() param){
        const user = await this.dbconnection.user.findFirst({where:{name: param.name}})
        if (user){
            // search for project with projectId
                const project: ResponseProjectDto = await this.dbconnection.projects.findFirst({where:{projectId: param.projectId, userId:param.name}})
                if(project){
                    return project
                }
                else{
                    throw new HttpException("project not found", HttpStatus.NOT_FOUND)
                }

        }
        else{
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
    }

    // this endpoint should allow for the creation of a new project
    @Post(":name")
    async createProject(@Param("name") name: string, @Body() project: ProjectDto){
        // first we check if the user exists or not
        const user = this.dbconnection.user.findFirst({where: {name: name}})
        if(user){
            const projectName = project.name
            const projectId = projectName + "-" + randomUUID().toString()
            await this.dbconnection.projects.create({
                include:{user:true},
                data:{...project, user:{connect:{name: name}}, projectId: projectId}
            })
        }
        else{
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
    }

    // create an endpoint that can update a project
    @Put(':id')
    async updateProject(@Param("id") id: string, @Body() projectUpdate: ProjectDto){
        const project = await this.dbconnection.projects.update({where:{projectId:id}, data:projectUpdate})
        const response: ResponseProjectDto ={...project}
        return response

    }

    // endpoint to delete a project 
    @Delete(':id')
    async deleteProject(@Param("id") id: string){
        return this.dbconnection.projects.delete({where:{projectId: id}})
    }
}
