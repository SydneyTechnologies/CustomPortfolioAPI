import { IsString, IsEmail, IsArray, IsOptional, IsUrl, isString } from "class-validator";
import { Type, Transform} from "class-transformer";

export class ArticleDto{
    @IsString()
    title: string 

    @IsOptional()
    @IsString()
    short_description: string

    @IsOptional()
    @IsString()
    @IsUrl()
    live_link: string


}

export class ResponseArticleDto extends ArticleDto{
    @IsString()
    userId: string 
}