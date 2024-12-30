import { providers } from "./config";
import type { Provider } from "./types";

export class AllPay {
    private providers: { [key: string]: Provider } = {};

    constructor() {
        this.init();
    }

    private init() {
        for (const { name, provider, drivers } of providers) {
            Object.defineProperty(this.providers, name, {
                get: () => {
                    if (!this.providers[`_${name}`]) {
                        // Instantiate provider
                        const ProviderInstance = new provider(name, drivers);
                        ProviderInstance.register();
                        this.providers[`_${name}`] = ProviderInstance;
                    }
                    return this.providers[`_${name}`];
                },
                enumerable: true,
                configurable: true
            });
        }

        // Log the initialized providers
        console.log(this.providers);
    }

    provider(name: string): Provider {
        const provider = this.providers[name];

        if (!provider) {
            throw new Error(`Provider '${name}' not found`);
        }

        return provider;
    }
}
