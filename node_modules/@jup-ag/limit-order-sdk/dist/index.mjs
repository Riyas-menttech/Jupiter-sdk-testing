var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/limitOrder.ts
import { AnchorProvider, Program } from "@coral-xyz/anchor";

// src/idl.ts
var IDL = {
  "version": "0.1.0",
  "name": "limit_order",
  "instructions": [
    {
      "name": "initializeOrder",
      "accounts": [
        {
          "name": "base",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "makerInputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "makerOutputAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "referral",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "outputMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "makingAmount",
          "type": "u64"
        },
        {
          "name": "takingAmount",
          "type": "u64"
        },
        {
          "name": "expiredAt",
          "type": {
            "option": "i64"
          }
        }
      ]
    },
    {
      "name": "fillOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taker",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "takerOutputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "makerOutputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerInputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referral",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "makingAmount",
          "type": "u64"
        },
        {
          "name": "maxTakingAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "preFlashFillOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taker",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "takerOutputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputMintTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instruction",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "makingAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "flashFillOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taker",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "makerOutputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "takerInputAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referral",
          "isMut": true,
          "isSigner": false,
          "isOptional": true
        },
        {
          "name": "inputMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputMintTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputMintTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxTakingAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "makerInputAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, it is not important if it is sol input mint"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": []
    },
    {
      "name": "cancelExpiredOrder",
      "accounts": [
        {
          "name": "order",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserve",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "maker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "makerInputAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, it is not important if it is sol input mint"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputMint",
          "isMut": false,
          "isSigner": false,
          "isOptional": true
        }
      ],
      "args": []
    },
    {
      "name": "withdrawFee",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "programFeeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTokenAcocunt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initFee",
      "accounts": [
        {
          "name": "keeper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "makerFee",
          "type": "u64"
        },
        {
          "name": "makerStableFee",
          "type": "u64"
        },
        {
          "name": "takerFee",
          "type": "u64"
        },
        {
          "name": "takerStableFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFee",
      "accounts": [
        {
          "name": "keeper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "makerFee",
          "type": "u64"
        },
        {
          "name": "makerStableFee",
          "type": "u64"
        },
        {
          "name": "takerFee",
          "type": "u64"
        },
        {
          "name": "takerStableFee",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "fee",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "makerFee",
            "type": "u64"
          },
          {
            "name": "makerStableFee",
            "type": "u64"
          },
          {
            "name": "takerFee",
            "type": "u64"
          },
          {
            "name": "takerStableFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maker",
            "type": "publicKey"
          },
          {
            "name": "inputMint",
            "type": "publicKey"
          },
          {
            "name": "outputMint",
            "type": "publicKey"
          },
          {
            "name": "waiting",
            "type": "bool"
          },
          {
            "name": "oriMakingAmount",
            "type": "u64"
          },
          {
            "name": "oriTakingAmount",
            "type": "u64"
          },
          {
            "name": "makingAmount",
            "type": "u64"
          },
          {
            "name": "takingAmount",
            "type": "u64"
          },
          {
            "name": "makerInputAccount",
            "type": "publicKey"
          },
          {
            "name": "makerOutputAccount",
            "type": "publicKey"
          },
          {
            "name": "reserve",
            "type": "publicKey"
          },
          {
            "name": "borrowMakingAmount",
            "type": "u64"
          },
          {
            "name": "expiredAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "base",
            "type": "publicKey"
          },
          {
            "name": "referral",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "orderKey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "taker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "remainingInAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "remainingOutAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "inAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "outAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CancelOrderEvent",
      "fields": [
        {
          "name": "orderKey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "CreateOrderEvent",
      "fields": [
        {
          "name": "orderKey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "maker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "inputMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "outputMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "inAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "outAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "expiredAt",
          "type": {
            "option": "i64"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6e3,
      "name": "InvalidMakingAmount"
    },
    {
      "code": 6001,
      "name": "InvalidTakingAmount"
    },
    {
      "code": 6002,
      "name": "InvalidMaxTakingAmount"
    },
    {
      "code": 6003,
      "name": "InvalidCalculation"
    },
    {
      "code": 6004,
      "name": "InvalidInputAccount"
    },
    {
      "code": 6005,
      "name": "InvalidOutputAccount"
    },
    {
      "code": 6006,
      "name": "InvalidPair"
    },
    {
      "code": 6007,
      "name": "MissingReferral"
    },
    {
      "code": 6008,
      "name": "OrderExpired"
    },
    {
      "code": 6009,
      "name": "OrderNotExpired"
    },
    {
      "code": 6010,
      "name": "InvalidKeeper"
    },
    {
      "code": 6011,
      "name": "MathOverflow"
    },
    {
      "code": 6012,
      "name": "ProgramMismatch"
    },
    {
      "code": 6013,
      "name": "UnknownInstruction"
    },
    {
      "code": 6014,
      "name": "MissingRepayInstructions"
    },
    {
      "code": 6015,
      "name": "InvalidOrder"
    },
    {
      "code": 6016,
      "name": "InvalidBorrowMakingAmount"
    }
  ]
};

// src/limitOrder.ts
import {
  PublicKey as PublicKey2,
  Transaction
} from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";

// src/utils.ts
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress
} from "@solana/spl-token";
var getOrCreateATAInstruction = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (tokenMint, owner, connection, payer = owner, allowOwnerOffCurve = true, programId = TOKEN_PROGRAM_ID) {
  let toAccount;
  try {
    toAccount = yield getAssociatedTokenAddress(
      tokenMint,
      owner,
      allowOwnerOffCurve,
      programId
    );
    const account = yield connection.getAccountInfo(toAccount);
    if (!account) {
      const ix = createAssociatedTokenAccountInstruction(
        payer,
        toAccount,
        owner,
        tokenMint,
        programId
      );
      return [toAccount, ix];
    }
    return [toAccount, void 0];
  } catch (e) {
    console.error("Error::getOrCreateATAInstruction", e);
    throw e;
  }
});

// src/constant.ts
import { PublicKey } from "@solana/web3.js";
var PROGRAM_ID_BY_CLUSTER = {
  localnet: new PublicKey("APpKbNFPVs3tpkMsKCHJCdD1uKiTH57KYXj6RQnqY1Fu"),
  devnet: new PublicKey("A785JfFMTxGPvmij7dC5GvqLFujJuFTdytnPMQf4Txuw"),
  "mainnet-beta": new PublicKey("jupoNjAxXgZ4rjzxzPMP4oxduvQsQtZzyknqvzYNrNu")
};
var LIMIT_ORDER_REFERRAL = new PublicKey(
  "45ruCyfdRkWpRNGEqWzjCiXRHkZs8WXCLQ67Pnpye7Hp"
);

// src/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
var client = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: "https://jup.ag/api/trpc"
    })
  ],
  transformer: superjson
});

// src/limitOrder.ts
import {
  ReferralProvider,
  PROGRAM_ID as REFERRAL_PROGRAM_ID_BY_CLUSTER
} from "@jup-ag/referral-sdk";
var MAX_CANCELLATION = 10;
var LimitOrderProvider = class {
  constructor(connection, referralAccount = null, referralName = null, cluster = "mainnet-beta") {
    this.referralAccount = referralAccount;
    this.referralName = referralName;
    this.connection = connection;
    this.referralProvider = new ReferralProvider(connection);
    const provider = new AnchorProvider(
      connection,
      {},
      AnchorProvider.defaultOptions()
    );
    this.program = new Program(IDL, PROGRAM_ID_BY_CLUSTER[cluster], provider);
  }
  getFee() {
    return __async(this, null, function* () {
      let [feeAuthority] = PublicKey2.findProgramAddressSync(
        [Buffer.from("fee")],
        this.program.programId
      );
      return yield this.program.account.fee.fetch(feeAuthority);
    });
  }
  getOrder(pubkey) {
    return __async(this, null, function* () {
      return yield this.program.account.order.fetch(pubkey);
    });
  }
  getOrders() {
    return __async(this, arguments, function* (filters = []) {
      return yield this.program.account.order.all(filters);
    });
  }
  getOrderPubkey(base) {
    return PublicKey2.findProgramAddressSync(
      [Buffer.from("order"), base.toBuffer()],
      PROGRAM_ID_BY_CLUSTER["mainnet-beta"]
    )[0];
  }
  getOrderHistoryCount(_0) {
    return __async(this, arguments, function* ({
      wallet
    }) {
      return yield client.orderHistoryCount.query({ wallet });
    });
  }
  getOrderHistory(_0) {
    return __async(this, arguments, function* ({
      wallet,
      lastCursor,
      take
    }) {
      return yield client.orderHistory.query({
        wallet,
        cursor: lastCursor,
        take
      });
    });
  }
  getTradeHistoryCount(_0) {
    return __async(this, arguments, function* ({
      wallet
    }) {
      return yield client.tradeHistoryCount.query({ wallet });
    });
  }
  getTradeHistory(_0) {
    return __async(this, arguments, function* ({
      wallet,
      lastCursor,
      take
    }) {
      return yield client.tradeHistory.query({
        wallet,
        cursor: lastCursor,
        take
      });
    });
  }
  createOrder(_0) {
    return __async(this, arguments, function* ({
      owner,
      inputMint,
      outputMint,
      outAmount,
      inAmount,
      base,
      expiredAt = null
    }) {
      const orderPubKey = this.getOrderPubkey(base);
      const [reservePubKey] = PublicKey2.findProgramAddressSync(
        [Buffer.from("reserve"), orderPubKey.toBuffer()],
        this.program.programId
      );
      let preInstructions = [];
      const inputMintAccount = yield this.connection.getAccountInfo(inputMint);
      const outputMintAccount = yield this.connection.getAccountInfo(outputMint);
      let [
        [inputAccount, createInputAccountIx],
        [outputAccount, createOutputAccountIx]
      ] = yield Promise.all([
        getOrCreateATAInstruction(
          inputMint,
          owner,
          this.connection,
          void 0,
          void 0,
          inputMintAccount.owner
        ),
        getOrCreateATAInstruction(
          outputMint,
          owner,
          this.connection,
          void 0,
          void 0,
          outputMintAccount.owner
        )
      ]);
      if (inputMint.equals(NATIVE_MINT)) {
        inputAccount = outputAccount;
      } else {
        if (createInputAccountIx)
          preInstructions.push(createInputAccountIx);
      }
      if (outputMint.equals(NATIVE_MINT)) {
        outputAccount = inputAccount;
      } else {
        if (createOutputAccountIx)
          preInstructions.push(createOutputAccountIx);
      }
      let referral = null;
      if (this.referralAccount) {
        const referralAccountPubKey = this.getReferralAccountPubKey();
        const referralTokenAccount = this.referralProvider.getReferralTokenAccountPubKey({
          mint: outputMint,
          referralAccountPubKey
        });
        const account = yield this.connection.getAccountInfo(
          referralTokenAccount
        );
        if (account) {
          referral = referralTokenAccount;
        }
      }
      const tx = yield this.program.methods.initializeOrder(inAmount, outAmount, expiredAt).accounts({
        maker: owner,
        makerInputAccount: inputAccount,
        inputMint,
        makerOutputAccount: outputAccount,
        outputMint,
        order: orderPubKey,
        reserve: reservePubKey,
        referral,
        base,
        tokenProgram: inputMintAccount.owner
      }).preInstructions(preInstructions).transaction();
      return { tx, orderPubKey };
    });
  }
  cancelOrderInstruction(_0) {
    return __async(this, arguments, function* ({
      owner,
      orderPubKey
    }) {
      const order = yield this.program.account.order.fetch(orderPubKey);
      let preInstructions = [];
      const mintAccount = yield this.connection.getAccountInfo(order.inputMint);
      const [inputAccount, createInputAccountIx] = yield getOrCreateATAInstruction(
        order.inputMint,
        owner,
        this.connection,
        void 0,
        void 0,
        mintAccount.owner
      );
      if (createInputAccountIx && !order.inputMint.equals(NATIVE_MINT))
        preInstructions.push(createInputAccountIx);
      const instruction = yield this.program.methods.cancelOrder().accounts({
        maker: owner,
        makerInputAccount: inputAccount,
        reserve: order.reserve,
        order: orderPubKey,
        tokenProgram: mintAccount.owner,
        inputMint: order.inputMint
      }).instruction();
      return [...preInstructions, instruction];
    });
  }
  cancelOrder(_0) {
    return __async(this, arguments, function* ({
      owner,
      orderPubKey
    }) {
      const ixs = yield this.cancelOrderInstruction({ owner, orderPubKey });
      return new Transaction().add(...ixs);
    });
  }
  batchCancelOrder(_0) {
    return __async(this, arguments, function* ({
      owner,
      ordersPubKey
    }) {
      if (ordersPubKey.length > MAX_CANCELLATION)
        throw `ordersPubKey lenght exceed ${MAX_CANCELLATION}`;
      const ixs = yield Promise.all(
        ordersPubKey.map(
          (orderPubKey) => this.cancelOrderInstruction({ owner, orderPubKey })
        )
      );
      return new Transaction().add(...ixs.flat());
    });
  }
  cancelExpiredOrderInstruction(_0) {
    return __async(this, arguments, function* ({
      orderPubKey
    }) {
      const order = yield this.program.account.order.fetch(orderPubKey);
      const mintAccount = yield this.connection.getAccountInfo(order.inputMint);
      const [inputAccount, createInputAccountIx] = yield getOrCreateATAInstruction(
        order.inputMint,
        order.maker,
        this.connection,
        void 0,
        void 0,
        mintAccount.owner
      );
      if (createInputAccountIx && !order.inputMint.equals(NATIVE_MINT)) {
        return null;
      }
      return yield this.program.methods.cancelExpiredOrder().accounts({
        order: orderPubKey,
        reserve: order.reserve,
        maker: order.maker,
        makerInputAccount: inputAccount,
        tokenProgram: mintAccount.owner,
        inputMint: order.inputMint
      }).instruction();
    });
  }
  cancelExpiredOrder(_0) {
    return __async(this, arguments, function* ({
      orderPubKey
    }) {
      const ix = yield this.cancelExpiredOrderInstruction({ orderPubKey });
      if (ix) {
        return new Transaction().add(ix);
      } else {
        return null;
      }
    });
  }
  batchCancelExpiredOrder(_0) {
    return __async(this, arguments, function* ({
      ordersPubKey
    }) {
      if (ordersPubKey.length > MAX_CANCELLATION)
        throw `ordersPubKey lenght exceed ${MAX_CANCELLATION}`;
      const ixs = yield Promise.all(
        ordersPubKey.map(
          (orderPubKey) => this.cancelExpiredOrderInstruction({ orderPubKey })
        )
      );
      const filteredIxs = ixs.filter(Boolean);
      if (filteredIxs.length > 0) {
        return new Transaction().add(...filteredIxs);
      } else {
        return null;
      }
    });
  }
  fillOrder(_0) {
    return __async(this, arguments, function* ({
      owner,
      orderAccount,
      amount,
      expectedOutAmount
    }) {
      const { account: order, publicKey } = orderAccount;
      let preInstructions = [];
      let [feeAuthority] = PublicKey2.findProgramAddressSync(
        [Buffer.from("fee")],
        this.program.programId
      );
      let makerOutputAccount = order.makerOutputAccount;
      let [
        [_, createMakerOutputAccountIx],
        [takerInputAccount, createTakerInputAccountIx],
        [takerOutputAccount, createOutputAccountIx],
        [programFeeAccount, programFeeAccountIx]
      ] = yield Promise.all([
        getOrCreateATAInstruction(
          order.outputMint,
          order.maker,
          this.connection,
          owner
        ),
        getOrCreateATAInstruction(order.outputMint, owner, this.connection),
        getOrCreateATAInstruction(order.inputMint, owner, this.connection),
        getOrCreateATAInstruction(
          order.outputMint,
          feeAuthority,
          this.connection,
          owner
        )
      ]);
      if (order.inputMint.toString() === NATIVE_MINT.toString()) {
        takerOutputAccount = owner;
      } else {
        if (createOutputAccountIx)
          preInstructions.push(createOutputAccountIx);
      }
      if (order.outputMint.toString() === NATIVE_MINT.toString()) {
        takerInputAccount = owner;
        makerOutputAccount = order.maker;
      } else {
        if (createMakerOutputAccountIx)
          preInstructions.push(createMakerOutputAccountIx);
        if (createTakerInputAccountIx)
          preInstructions.push(createTakerInputAccountIx);
      }
      if (programFeeAccountIx)
        preInstructions.push(programFeeAccountIx);
      const tx = yield this.program.methods.fillOrder(amount, expectedOutAmount).accounts({
        order: publicKey,
        reserve: order.reserve,
        maker: order.maker,
        taker: owner,
        makerOutputAccount,
        takerInputAccount,
        takerOutputAccount,
        programFeeAccount,
        referral: order.referral,
        feeAuthority
      }).preInstructions(preInstructions).transaction();
      return tx;
    });
  }
  createReferralAccount(payerPubKey) {
    return __async(this, null, function* () {
      if (!this.referralAccount)
        throw "Referral is missing";
      if (!this.referralName)
        throw "Name is missing";
      return yield this.referralProvider.initializeReferralAccountWithName({
        projectPubKey: LIMIT_ORDER_REFERRAL,
        partnerPubKey: this.referralAccount,
        name: this.referralName,
        payerPubKey
      });
    });
  }
  createReferralTokenAccount(mint, payerPubKey) {
    return __async(this, null, function* () {
      if (!this.referralAccount)
        throw "Referral is missing";
      const referralAccountPubKey = this.getReferralAccountPubKey();
      const referralAccount = yield this.referralProvider.getReferralAccount(
        referralAccountPubKey
      );
      if (!referralAccount)
        throw "Referral account already exists";
      return this.referralProvider.initializeReferralTokenAccount({
        mint,
        payerPubKey,
        referralAccountPubKey
      });
    });
  }
  claimReferral(mint, payerPubKey) {
    return __async(this, null, function* () {
      if (!this.referralAccount)
        throw "Referral is missing";
      const referralAccountPubKey = this.getReferralAccountPubKey();
      const referralAccount = yield this.referralProvider.getReferralAccount(
        referralAccountPubKey
      );
      if (!referralAccount)
        throw "Referral account already exists";
      return yield this.referralProvider.claim({
        mint,
        referralAccountPubKey,
        payerPubKey
      });
    });
  }
  getReferralAccountPubKey() {
    if (!this.referralName) {
      const [referralAccountPubKey] = PublicKey2.findProgramAddressSync(
        [
          Buffer.from("referral"),
          LIMIT_ORDER_REFERRAL.toBuffer(),
          this.referralAccount.toBuffer()
        ],
        REFERRAL_PROGRAM_ID_BY_CLUSTER
      );
      return referralAccountPubKey;
    } else {
      return this.referralProvider.getReferralAccountWithNamePubKey({
        projectPubKey: LIMIT_ORDER_REFERRAL,
        name: this.referralName
      });
    }
  }
};

// src/getOrderFilter.ts
var ownerFilter = (publicKey) => {
  return {
    memcmp: {
      offset: 8,
      bytes: publicKey.toBase58()
    }
  };
};
var inputMintFilter = (publicKey) => {
  return {
    memcmp: {
      offset: 8 + 32,
      bytes: publicKey.toBase58()
    }
  };
};
var outputMintFilter = (publicKey) => {
  return {
    memcmp: {
      offset: 8 + 2 * 32,
      bytes: publicKey.toBase58()
    }
  };
};
export {
  IDL,
  LIMIT_ORDER_REFERRAL,
  LimitOrderProvider,
  PROGRAM_ID_BY_CLUSTER,
  inputMintFilter,
  outputMintFilter,
  ownerFilter
};
//# sourceMappingURL=index.mjs.map