import { Exception } from "../../shared/Exception";

export class BusinessException extends Exception {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessException';
    }
}
