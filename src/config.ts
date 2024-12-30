import Crypto from "./providers/crypto"

import { BTC } from "./drivers/btc"

export const providers = [
    {
        name: 'crypto',
        provider: Crypto,
        drivers: [
            {
                name: 'btc',
                driver: BTC
            }
        ]
    }
]
