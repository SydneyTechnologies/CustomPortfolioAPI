import { IsString, IsEmail, IsArray, IsOptional, IsUrl} from "class-validator";
import { Type, Transform} from "class-transformer";

export class ProjectDto{

    @IsString()
    name: string 

    @IsOptional()
    @IsString()
    description: string

    @IsArray()
    @IsOptional()
    technologies_used: string[]

    @IsOptional()
    @IsString()
    @IsUrl()
    github_link: string

    @IsOptional()
    @IsString()
    @IsUrl()
    live_link: string



}

export class ResponseProjectDto extends ProjectDto{
    @IsOptional()
    @IsString()
    projectId: string

    @IsOptional()
    @IsString()
    userId: string


}