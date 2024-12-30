# AllPay

AllPay is a flexible, extensible payments integration package designed to support multiple payment methods such as mobile money (e.g., M-Pesa), cryptocurrencies (e.g., Bitcoin), and traditional card payments. The package allows you to register various providers and drivers, enabling seamless interaction with different payment services.

## Features
- **Multiple Payment Providers**: Easily integrate with various payment providers like crypto, mobile money, and card payments.
- **Modular and Extensible**: Easily extend the functionality by adding more drivers to each provider.
- **Dynamic Driver Initialization**: Instantiates drivers on demand, ensuring that only the required drivers are initialized.
- **Type-safe**: Built with TypeScript, ensuring type safety and autocompletion in your editor.

## Installation
To install AllPay, simply use npm or yarn:

```bash
npm install allpay
```

or

```bash
yarn add allpay
```

## Usage

### Setting Up Providers and Drivers
1. **Configure Providers**: Define your payment providers and their respective drivers.

```ts
import Crypto from "src/providers/crypto";
import { BTC } from "src/drivers/btc";

export const providers = [
    {
        name: 'crypto',
        provider: Crypto,  // Provider class
        drivers: [
            {
                name: 'btc',
                driver: BTC  // Driver class
            }
        ]
    }
];
```

2. **Initialize the AllPay Class**: Instantiate the AllPay class and configure the available providers.

```ts
import { AllPay } from 'allpay';

// Initialize the AllPay instance
const allpay = new AllPay();
```

### Using Providers and Drivers
Once the providers are initialized, you can interact with them using the `provider(name)` method.

```ts
const cryptoProvider = allpay.provider('crypto'); // Get the Crypto provider
const btcDriver = cryptoProvider.driver('btc');  // Get the BTC driver

// Use the driver for actions like withdrawal, deposit, etc.
btcDriver.deposit({ amount: 100, currency: 'BTC' })
    .then(success => console.log('Deposit successful:', success))
    .catch(error => console.log('Deposit failed:', error));
```

### Example of a Full Integration

```ts
import { AllPay } from 'allpay';

const allpay = new AllPay();

const cryptoProvider = allpay.provider('crypto');
const btcDriver = cryptoProvider.driver('btc');

btcDriver.deposit({ amount: 100, currency: 'BTC' });
```

## Providers and Drivers
- **Providers**: Providers are services that facilitate transactions. Examples include "crypto" or "mobile_money".
- **Drivers**: Drivers are individual payment methods offered by each provider. For example, "BTC" can be a driver under the "crypto" provider.

### Adding New Providers and Drivers
To add new providers or drivers:

1. **Create a new Provider**: Implement the `IBaseProvider` interface.
2. **Add a Driver**: Implement the `Driver` interface and attach it to the appropriate provider.

Example:

```ts
// Create a new Driver
class NewDriver implements Driver {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    register() {
        console.log(`Driver ${this.name} registered.`);
    }

    withdraw(options: any): Promise<boolean> {
        // Implement withdrawal logic here
        return Promise.resolve(true);
    }

    deposit(options: any): Promise<boolean> {
        // Implement deposit logic here
        return Promise.resolve(true);
    }
}

// Add the new Driver to the configuration
export const providers = [
    {
        name: 'newProvider',
        provider: NewProvider,
        drivers: [
            {
                name: 'newDriver',
                driver: NewDriver
            }
        ]
    }
];
```

## API
