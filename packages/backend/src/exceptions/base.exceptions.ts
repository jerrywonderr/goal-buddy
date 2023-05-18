import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

export class AppBaseException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}

export class UserNotFound extends NotFoundException {
    constructor(username: string) {
        super(`User identified by ${username} not found`);
    }
}