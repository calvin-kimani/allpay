import BaseDriver from "./BaseDriver";

export class BTC extends BaseDriver {
    async deposit(options: any): Promise<Boolean> {
        return false;
    }

    async withdraw(options: any): Promise<Boolean> {
        return false;
    }
}