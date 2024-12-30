import type { Driver, IBaseProvider } from "../types";

export default class BaseProvider implements IBaseProvider {
    name: string;
    drivers: { [key: string]: Driver } = {};

    constructor(name: string, drivers: { name: string; driver: any }[]) {
        this.name = name;
        this.init(drivers);
    }

    init(drivers: { name: string, driver: new (...args: any[]) => Driver }[]): void {
        // Initialize drivers with the provided array
        drivers.forEach(({ name, driver }) => {
            Object.defineProperty(this.drivers, name, {
                get: () => {
                    if (!this.drivers[`_${name}`]) {
                        const DriverInstance = new driver(name);
                        DriverInstance.register();
                        this.drivers[`_${name}`] = DriverInstance;
                    }
                    return this.drivers[`_${name}`];
                },
                enumerable: true,
                configurable: true
            });
        });
    }

    register(): void {
        console.log(`${this.name} provider registered.`);
    }

    // Find and return the driver by name
    driver(name: string): Driver | undefined {
        const driver = this.drivers[name];

        if (!driver) {
            throw new Error(`Driver '${name}' not found`);
        }

        return driver;
    }

    // Add a new driver to the list
    addDriver(name: string, driver: Driver): boolean {
        this.drivers[`_${name}`] = driver;

        if (!this.drivers[`_${name}`]) {
            return true;
        }

        return false;
    }
}

