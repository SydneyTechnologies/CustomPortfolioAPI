import { IsString, IsEmail, IsOptional, IsUrl, IsNotEmpty} from "class-validator";
import { Type, Transform} from "class-transformer";
import { ArticleDto } from "src/article/article.dto";
import { ProjectDto } from "src/project/project.dto";

export class UserDto{
    @IsString()
    @IsNotEmpty()
    name: string 

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    bio: string

    @IsOptional()
    @IsUrl()
    twitter: string

    @IsOptional()
    @IsUrl()
    linkedin: string

    @IsOptional()
    @IsUrl()
    github: string

}

export class UpdateUserDto extends UserDto{
    @IsOptional()
    name: string;
}

export class ResponseUserDto extends UserDto{
    @IsOptional()
    articles: ArticleDto[]

    @IsOptional()
    projects: ProjectDto[]
}