import express, { Request, Response } from "express";
import {
  Keypair,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { LimitOrderProvider } from "@jup-ag/limit-order-sdk";
import BN from "bn.js";
import { OrderHistoryItem } from "@jup-ag/limit-order-sdk";

const app = express();
const PORT = process.env.PORT || 3000;

const SOLANA_RPC_ENDPOINT =
  "https://solana-devnet.g.alchemy.com/v2/xYS6JLLyyvrSXdUiWILRgyCq8rMPJ92I";
const connection = new Connection(SOLANA_RPC_ENDPOINT);

function generateWalletForUserId(): Keypair {
  return Keypair.generate();
}
app.use(express.json());

// Initialize LimitOrderProvider
const limitOrder = new LimitOrderProvider(connection);
const order = generateWalletForUserId();
const ownerObject = generateWalletForUserId();

// Endpoint to create a limit order
app.post("/create-order", async (req: Request, res: Response) => {
  const { userId }: { userId: string } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID and order parameters are required." });
  }
  try {
    // Generate owner keypair

    console.log(ownerObject.publicKey, "owner");

    // Define inputToken and outputToken
    const { inputToken, outputToken } = req.body;

    // Base keypair used to generate a unique order id
    const base = generateWalletForUserId();
    console.log(base.publicKey, "base");
    console.log("owner.publicKey.toString()", ownerObject==null)
    // Create limit order
    const { tx } = await limitOrder.createOrder({
      owner: ownerObject.publicKey,
      inAmount: new BN(100000), // Amount of input token (in smallest unit, e.g., lamports)
      outAmount: new BN(100000), // Amount of output token (in smallest unit, e.g., lamports)
      inputMint: new PublicKey(inputToken),
      outputMint: new PublicKey(outputToken),
      expiredAt: null, // Expiration timestamp, null for no expiration
      base: base.publicKey,
    });
    console.log(tx, "txxx");

    // Send and confirm transaction
    await sendAndConfirmTransaction(connection, tx, [ownerObject, base]);

    res.json({ message: "Limit order created successfully." });
  } catch (error) {
    console.log(error, "error");
    res
      .status(500)
      .json({ error: "Failed to create limit order.", details: error });
  }
});

// // Endpoint to query user order and history
app.get("/query-order-history", async (req: Request, res: Response) => {
  // const   userId:any = req.query.userId;

  try {
    const orderHistory: OrderHistoryItem[] = await limitOrder.getOrderHistory({
      wallet: ownerObject.publicKey.toBase58(),
      take: 20, // optional, default is 20, maximum is 100
      // lastCursor: order.id // optional, for pagination
    });

    console.log(orderHistory, "order history");

    res.json({ orderHistory }); // Example response
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to query order history.", details: error });
  }
});

// // Endpoint to cancel order
app.post("/cancel-order", async (req: Request, res: Response) => {
  // const { userId, orderId }: { userId: string; orderId: string } = req.body;

  // if (!userId || !orderId) {
  //   return res
  //     .status(400)
  //     .json({ error: "User ID and order ID are required." });
  // }

  try {
    const txid = await limitOrder.cancelOrder({
      owner: ownerObject.publicKey,
      orderPubKey: order.publicKey,
    });

    console.log(txid, "cancel ap");

    res.json({ message: "Order canceled successfully.", txid });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order.", details: error });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
