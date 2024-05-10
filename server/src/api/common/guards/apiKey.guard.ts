import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const apiKey = request.headers["x-api-key"];

        if (!apiKey || apiKey !== process.env.X_API_KEY) {
            throw new UnauthorizedException("Invalid or missing API key");
        }

        return true;
    }
}
