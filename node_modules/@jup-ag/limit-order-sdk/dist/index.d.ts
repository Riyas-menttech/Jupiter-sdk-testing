import { IdlAccounts, BN } from '@coral-xyz/anchor';
import { PublicKey, Connection, GetProgramAccountsFilter, Transaction, TransactionInstruction } from '@solana/web3.js';
import { OrderHistoryItem, TradeHistoryItem } from '@jup-ag/limit-order-trpc';
export { OrderHistoryItem, TradeHistoryItem } from '@jup-ag/limit-order-trpc';

declare type LimitOrder = {
    "version": "0.1.0";
    "name": "limit_order";
    "instructions": [
        {
            "name": "initializeOrder";
            "accounts": [
                {
                    "name": "base";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "maker";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                    "docs": [
                        "CHECK"
                    ];
                },
                {
                    "name": "makerInputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "inputMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "makerOutputAccount";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "referral";
                    "isMut": false;
                    "isSigner": false;
                    "isOptional": true;
                },
                {
                    "name": "outputMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "rent";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "makingAmount";
                    "type": "u64";
                },
                {
                    "name": "takingAmount";
                    "type": "u64";
                },
                {
                    "name": "expiredAt";
                    "type": {
                        "option": "i64";
                    };
                }
            ];
        },
        {
            "name": "fillOrder";
            "accounts": [
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "maker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "taker";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "takerOutputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "makerOutputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "takerInputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "feeAuthority";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "programFeeAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "referral";
                    "isMut": true;
                    "isSigner": false;
                    "isOptional": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "makingAmount";
                    "type": "u64";
                },
                {
                    "name": "maxTakingAmount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "preFlashFillOrder";
            "accounts": [
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "taker";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "takerOutputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "inputMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "inputMintTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "instruction";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "makingAmount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "flashFillOrder";
            "accounts": [
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "maker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "taker";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "makerOutputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "takerInputAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "feeAuthority";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "programFeeAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "referral";
                    "isMut": true;
                    "isSigner": false;
                    "isOptional": true;
                },
                {
                    "name": "inputMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "inputMintTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "outputMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "outputMintTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "maxTakingAmount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "cancelOrder";
            "accounts": [
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                    "docs": [
                        "CHECK"
                    ];
                },
                {
                    "name": "maker";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "makerInputAccount";
                    "isMut": true;
                    "isSigner": false;
                    "docs": [
                        "CHECK, it is not important if it is sol input mint"
                    ];
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "inputMint";
                    "isMut": false;
                    "isSigner": false;
                    "isOptional": true;
                }
            ];
            "args": [];
        },
        {
            "name": "cancelExpiredOrder";
            "accounts": [
                {
                    "name": "order";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "reserve";
                    "isMut": true;
                    "isSigner": false;
                    "docs": [
                        "CHECK"
                    ];
                },
                {
                    "name": "maker";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "makerInputAccount";
                    "isMut": true;
                    "isSigner": false;
                    "docs": [
                        "CHECK, it is not important if it is sol input mint"
                    ];
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "inputMint";
                    "isMut": false;
                    "isSigner": false;
                    "isOptional": true;
                }
            ];
            "args": [];
        },
        {
            "name": "withdrawFee";
            "accounts": [
                {
                    "name": "admin";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "feeAuthority";
                    "isMut": false;
                    "isSigner": false;
                    "docs": [
                        "CHECK"
                    ];
                },
                {
                    "name": "programFeeAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "adminTokenAcocunt";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "mint";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "initFee";
            "accounts": [
                {
                    "name": "keeper";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "feeAuthority";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "makerFee";
                    "type": "u64";
                },
                {
                    "name": "makerStableFee";
                    "type": "u64";
                },
                {
                    "name": "takerFee";
                    "type": "u64";
                },
                {
                    "name": "takerStableFee";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "updateFee";
            "accounts": [
                {
                    "name": "keeper";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "feeAuthority";
                    "isMut": true;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "makerFee";
                    "type": "u64";
                },
                {
                    "name": "makerStableFee";
                    "type": "u64";
                },
                {
                    "name": "takerFee";
                    "type": "u64";
                },
                {
                    "name": "takerStableFee";
                    "type": "u64";
                }
            ];
        }
    ];
    "accounts": [
        {
            "name": "fee";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "makerFee";
                        "type": "u64";
                    },
                    {
                        "name": "makerStableFee";
                        "type": "u64";
                    },
                    {
                        "name": "takerFee";
                        "type": "u64";
                    },
                    {
                        "name": "takerStableFee";
                        "type": "u64";
                    }
                ];
            };
        },
        {
            "name": "order";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "maker";
                        "type": "publicKey";
                    },
                    {
                        "name": "inputMint";
                        "type": "publicKey";
                    },
                    {
                        "name": "outputMint";
                        "type": "publicKey";
                    },
                    {
                        "name": "waiting";
                        "type": "bool";
                    },
                    {
                        "name": "oriMakingAmount";
                        "type": "u64";
                    },
                    {
                        "name": "oriTakingAmount";
                        "type": "u64";
                    },
                    {
                        "name": "makingAmount";
                        "type": "u64";
                    },
                    {
                        "name": "takingAmount";
                        "type": "u64";
                    },
                    {
                        "name": "makerInputAccount";
                        "type": "publicKey";
                    },
                    {
                        "name": "makerOutputAccount";
                        "type": "publicKey";
                    },
                    {
                        "name": "reserve";
                        "type": "publicKey";
                    },
                    {
                        "name": "borrowMakingAmount";
                        "type": "u64";
                    },
                    {
                        "name": "expiredAt";
                        "type": {
                            "option": "i64";
                        };
                    },
                    {
                        "name": "base";
                        "type": "publicKey";
                    },
                    {
                        "name": "referral";
                        "type": {
                            "option": "publicKey";
                        };
                    }
                ];
            };
        }
    ];
    "events": [
        {
            "name": "TradeEvent";
            "fields": [
                {
                    "name": "orderKey";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "taker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "remainingInAmount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "remainingOutAmount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "inAmount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "outAmount";
                    "type": "u64";
                    "index": false;
                }
            ];
        },
        {
            "name": "CancelOrderEvent";
            "fields": [
                {
                    "name": "orderKey";
                    "type": "publicKey";
                    "index": false;
                }
            ];
        },
        {
            "name": "CreateOrderEvent";
            "fields": [
                {
                    "name": "orderKey";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "maker";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "inputMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "outputMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "inAmount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "outAmount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "expiredAt";
                    "type": {
                        "option": "i64";
                    };
                    "index": false;
                }
            ];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "InvalidMakingAmount";
        },
        {
            "code": 6001;
            "name": "InvalidTakingAmount";
        },
        {
            "code": 6002;
            "name": "InvalidMaxTakingAmount";
        },
        {
            "code": 6003;
            "name": "InvalidCalculation";
        },
        {
            "code": 6004;
            "name": "InvalidInputAccount";
        },
        {
            "code": 6005;
            "name": "InvalidOutputAccount";
        },
        {
            "code": 6006;
            "name": "InvalidPair";
        },
        {
            "code": 6007;
            "name": "MissingReferral";
        },
        {
            "code": 6008;
            "name": "OrderExpired";
        },
        {
            "code": 6009;
            "name": "OrderNotExpired";
        },
        {
            "code": 6010;
            "name": "InvalidKeeper";
        },
        {
            "code": 6011;
            "name": "MathOverflow";
        },
        {
            "code": 6012;
            "name": "ProgramMismatch";
        },
        {
            "code": 6013;
            "name": "UnknownInstruction";
        },
        {
            "code": 6014;
            "name": "MissingRepayInstructions";
        },
        {
            "code": 6015;
            "name": "InvalidOrder";
        },
        {
            "code": 6016;
            "name": "InvalidBorrowMakingAmount";
        }
    ];
};
declare const IDL: LimitOrder;

declare type Cluster = "mainnet-beta" | "devnet" | "localnet";
declare const PROGRAM_ID_BY_CLUSTER: {
    [key in Cluster]: PublicKey;
};
declare const LIMIT_ORDER_REFERRAL: PublicKey;

declare type Order = IdlAccounts<LimitOrder>["order"];
interface CreateOrderParams {
    owner: PublicKey;
    inputMint: PublicKey;
    inAmount: BN;
    outputMint: PublicKey;
    outAmount: BN;
    base: PublicKey;
    expiredAt?: BN | null;
}
interface CancelOrderParams {
    owner: PublicKey;
    orderPubKey: PublicKey;
}
interface BatchCancelOrderParams {
    owner: PublicKey;
    ordersPubKey: PublicKey[];
}
interface CancelExpiredOrderParams {
    orderPubKey: PublicKey;
}
interface BatchCancelExpiredOrderParams {
    ordersPubKey: PublicKey[];
}
interface FillOrderParams {
    owner: PublicKey;
    orderAccount: {
        publicKey: PublicKey;
        account: Order;
    };
    amount: BN;
    expectedOutAmount: BN;
}
declare class LimitOrderProvider {
    private program;
    private connection;
    private referralAccount;
    private referralName;
    private referralProvider;
    constructor(connection: Connection, referralAccount?: PublicKey, referralName?: string, cluster?: Cluster);
    getFee(): Promise<IdlAccounts<LimitOrder>["fee"]>;
    getOrder(pubkey: PublicKey): Promise<Order>;
    getOrders(filters?: GetProgramAccountsFilter[]): Promise<{
        publicKey: PublicKey;
        account: Order;
    }[]>;
    getOrderPubkey(base: PublicKey): PublicKey;
    getOrderHistoryCount({ wallet, }: {
        wallet: string;
    }): Promise<number>;
    getOrderHistory({ wallet, lastCursor, take, }: {
        wallet: string;
        lastCursor?: number;
        take?: number;
    }): Promise<OrderHistoryItem[]>;
    getTradeHistoryCount({ wallet, }: {
        wallet: string;
    }): Promise<number>;
    getTradeHistory({ wallet, lastCursor, take, }: {
        wallet: string;
        lastCursor?: number;
        take?: number;
    }): Promise<TradeHistoryItem[]>;
    createOrder({ owner, inputMint, outputMint, outAmount, inAmount, base, expiredAt, }: CreateOrderParams): Promise<{
        tx: Transaction;
        orderPubKey: PublicKey;
    }>;
    cancelOrderInstruction({ owner, orderPubKey, }: CancelOrderParams): Promise<TransactionInstruction[]>;
    cancelOrder({ owner, orderPubKey, }: CancelOrderParams): Promise<Transaction>;
    batchCancelOrder({ owner, ordersPubKey, }: BatchCancelOrderParams): Promise<Transaction>;
    cancelExpiredOrderInstruction({ orderPubKey, }: CancelExpiredOrderParams): Promise<TransactionInstruction | null>;
    cancelExpiredOrder({ orderPubKey, }: CancelExpiredOrderParams): Promise<Transaction | null>;
    batchCancelExpiredOrder({ ordersPubKey, }: BatchCancelExpiredOrderParams): Promise<Transaction>;
    fillOrder({ owner, orderAccount, amount, expectedOutAmount, }: FillOrderParams): Promise<Transaction>;
    createReferralAccount(payerPubKey: PublicKey): Promise<{
        tx: Transaction;
        referralAccountPubKey: PublicKey;
    }>;
    createReferralTokenAccount(mint: PublicKey, payerPubKey: PublicKey): Promise<{
        tx: Transaction;
        referralTokenAccountPubKey: PublicKey;
    }>;
    claimReferral(mint: PublicKey, payerPubKey: PublicKey): Promise<Transaction>;
    getReferralAccountPubKey(): PublicKey;
}

declare const ownerFilter: (publicKey: PublicKey) => {
    memcmp: {
        offset: number;
        bytes: string;
    };
};
declare const inputMintFilter: (publicKey: PublicKey) => GetProgramAccountsFilter;
declare const outputMintFilter: (publicKey: PublicKey) => GetProgramAccountsFilter;

export { BatchCancelExpiredOrderParams, BatchCancelOrderParams, CancelExpiredOrderParams, CancelOrderParams, Cluster, CreateOrderParams, FillOrderParams, IDL, LIMIT_ORDER_REFERRAL, LimitOrder, LimitOrderProvider, Order, PROGRAM_ID_BY_CLUSTER, inputMintFilter, outputMintFilter, ownerFilter };
