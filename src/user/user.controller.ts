import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpStatus, HttpException} from '@nestjs/common';
import { PrismaConnectionService } from 'src/prisma-connection/prisma-connection.service';
import { UserDto, UpdateUserDto, ResponseUserDto} from './user.dto';


@Controller('users')
export class UserController {
    constructor(private readonly dbconnection: PrismaConnectionService){}

    @Get()
    async getAll(){
        // this endpoint is responsible for getting specific users 
        // from the database
        return await this.dbconnection.user.findMany({take: 100})
    }

    @Get(':name')
    async getUser(@Param('name') name: string){
        // this endpoint is responsible for getting specific users 
        // from the database
        const user = await this.dbconnection.user.findFirst({where: {name: name}})
        if (user !== undefined || user !== null){
            return user
        }
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    @Post()
    async createUser(@Body() userInfo: UserDto){
        // first we check if the user already exists 
        console.log(userInfo)
        // if (userInfo.name==undefined || userInfo.name == null){
        //     throw new HttpException("Request body is empty", HttpStatus.BAD_REQUEST)
        // }
        const username: string = userInfo.name;
        const user = await this.dbconnection.user.findUnique({where:{name: username}})
        if (user){
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
        }
        else{
            // so the user does not exist basically 
            // we can create a new user here
            const newUser = await this.dbconnection.user.create({data:userInfo})
            const response: ResponseUserDto = {...newUser, articles:[], projects:[]}
            return response
        }
    }

    @Put(':name')
    async updateUser(@Body() updateUserInfo: UpdateUserDto, @Param("name") name: string){
        await this.dbconnection.user.update({where:{name: name}, data:updateUserInfo})
        const user = await this.dbconnection.user.findFirst({where:{name:name}, include:{
            projects:true,
            articles:true
        }})
        return user
    }

    @Delete(':name')
    async DeleteUser(@Param("name") name: string){
        const user = await this.dbconnection.user.findUnique({where:{name: name}})
        if (user){
            return await this.dbconnection.user.delete({where:{name: name}})
        }
        else{
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        
    }
}
