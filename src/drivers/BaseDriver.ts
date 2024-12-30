import type { Driver } from "../types";

export default class BaseDriver implements Driver{
    name: string;

    constructor(name: string){
        this.name= name;
    }

    register(): void {
        console.log(`${this.name} driver registered.`);
    }

    withdraw(options: any): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

    deposit(options: any): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}