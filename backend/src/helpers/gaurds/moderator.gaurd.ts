import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
class IsModerator implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// Implement logic later, probabaly after setting up authentication
		return true;
	}
}

export default IsModerator;