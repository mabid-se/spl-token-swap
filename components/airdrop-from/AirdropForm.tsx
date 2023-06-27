import { FC, useEffect, useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { AirdropSchema } from "../../models/Airdrop";
import {
  kryptMint,
  ScroogeCoinMint,
  airdropPDA,
  airdropProgramId,
} from "../../utils/constants";
import * as token from "@solana/spl-token";
import styles from "./styles.module.css";

export const Airdrop: FC = () => {
  const [amount, setAmount] = useState(0);
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const currencyOpt = ["MUD", "ZAR", "ETH", "BTX"];

  const [currency1, setCurrency1] = useState("MUD");
  const [currency2, setCurrency2] = useState("BTX");
  const [reverse, setReverse] = useState(false);

  const handleCurrency1Change = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency1(event.target.value);
  };

  const handleCurrency2Change = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency2(event.target.value);
  };

  const handleReverseClick = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setReverse(!reverse);
  };

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleKryptSubmit = (event: any) => {
    event.preventDefault();
    const airdrop = new AirdropSchema(amount);
    handleKryptTransactionSubmit(airdrop);
  };

  const handleKryptTransactionSubmit = async (airdrop: AirdropSchema) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }
    const transaction = new Web3.Transaction();

    const userATA = await token.getAssociatedTokenAddress(kryptMint, publicKey);
    let account = await connection.getAccountInfo(userATA);

    if (account == null) {
      const createATAIX = await token.createAssociatedTokenAccountInstruction(
        publicKey,
        userATA,
        publicKey,
        kryptMint
      );
      transaction.add(createATAIX);
    }

    const buffer = airdrop.serialize();

    const airdropIX = new Web3.TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: userATA, isSigner: false, isWritable: true },
        { pubkey: kryptMint, isSigner: false, isWritable: true },
        { pubkey: airdropPDA, isSigner: false, isWritable: false },
        { pubkey: token.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      ],
      data: buffer,
      programId: airdropProgramId,
    });

    transaction.add(airdropIX);

    try {
      let txid = await sendTransaction(transaction, connection);
      alert(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      console.log(JSON.stringify(e));
      alert(JSON.stringify(e));
    }
  };

  const handleScroogeSubmit = (event: any) => {
    event.preventDefault();
    const airdrop = new AirdropSchema(amount);
    handleScroogeTransactionSubmit(airdrop);
  };

  const handleScroogeTransactionSubmit = async (airdrop: AirdropSchema) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }
    const transaction = new Web3.Transaction();

    const userATA = await token.getAssociatedTokenAddress(
      ScroogeCoinMint,
      publicKey
    );
    let account = await connection.getAccountInfo(userATA);

    if (account == null) {
      const createATAIX = await token.createAssociatedTokenAccountInstruction(
        publicKey,
        userATA,
        publicKey,
        ScroogeCoinMint
      );
      transaction.add(createATAIX);
    }

    const buffer = airdrop.serialize();

    const airdropIX = new Web3.TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: userATA, isSigner: false, isWritable: true },
        { pubkey: ScroogeCoinMint, isSigner: false, isWritable: true },
        { pubkey: airdropPDA, isSigner: false, isWritable: false },
        { pubkey: token.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      ],
      data: buffer,
      programId: airdropProgramId,
    });

    transaction.add(airdropIX);

    try {
      let txid = await sendTransaction(transaction, connection);
      alert(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      console.log(JSON.stringify(e));
      alert(JSON.stringify(e));
    }
  };

  return (
    <Grid py={8} px={6}>
      <GridItem
        style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
      >
        <h3 className={styles.mainHeading}>Music Exchanger</h3>
      </GridItem>
      <GridItem
        className={styles.currencyContainer}
        style={{ margin: "8px 0 0 0" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "30%", margin: "0 15px 0 0" }}>
            <Input
              isRequired
              variant="flushed"
              placeholder="0.0"
              max={1000}
              min={1}
              onChange={(valueString) => setAmount(parseInt(valueString))}
              _placeholder={{ color: "white" }}
              _focus={{
                caretColor: "#3B82F6",
                borderBottomColor: "#3B82F6",
                _placeholder: { color: "#3B82F6" },
              }}
            />
          </div>
          <div style={{ width: "20%", marginRight: "0 0 0 15px" }}>
            <select
              value={currency1}
              placeholder={currency1}
              onChange={handleCurrency1Change}
              style={{
                background: "#1f2937",
                padding: "8px 0",
                borderBottom: "1px solid white",
                color: "white",
              }}
            >
              {currencyOpt.map((optItem) => (
                <option value={optItem}>{optItem}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: ".5rem",
          }}
        >
          <h6 style={{ color: "white" }}>Balance: {`"$0.0"`}</h6>
        </div>
      </GridItem>
      <GridItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "-3px 0",
            background: "#3b82f6",
            padding: 4,
            borderRadius: 25,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={handleReverseClick}
        >
          <svg
            fill="white"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z"></path>
          </svg>
        </div>
      </GridItem>
      <GridItem
        className={styles.currencyContainer}
        style={{ margin: "0 0 8px 0" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "30%", margin: "0 15px 0 0" }}>
            <Input
              isRequired
              max={1000}
              min={1}
              variant="flushed"
              onChange={(valueString) => setAmount(parseInt(valueString))}
              placeholder="0.0"
              _placeholder={{ color: "white" }}
              _focus={{
                caretColor: "#3B82F6",
                borderBottomColor: "#3B82F6",
                _placeholder: { color: "#3B82F6" },
              }}
            />
          </div>
          <div style={{ width: "20%", marginRight: "0 0 0 15px" }}>
            <select
              value={currency2}
              placeholder={currency2}
              onChange={handleCurrency2Change}
              style={{
                background: "#1f2937",
                padding: "8px 0",
                borderBottom: "1px solid white",
                color: "white",
              }}
            >
              {currencyOpt.map((optItem) => (
                <option
                  value={optItem}
                  style={{ color: "#3B82F6", backgroundColor: "#1f2937" }}
                >
                  {optItem}
                </option>
                // <option value={optItem} style={{
                // color: '#3B82F6',
                // background-color: '#1f2937'
                // }}>{optItem}</option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: ".5rem",
          }}
        >
          <h6 style={{ color: "white" }}>Balance: {`"$0.0"`}</h6>
        </div>
      </GridItem>

      <GridItem style={{ margin: "8px 0" }}>
        <Button
          type="submit"
          style={{
            width: "100%",
            background: "#3B82F6",
            borderRadius: ".5rem",
            padding: "10px 0",
            fontWeight: 600,
            color: "white",
          }}
          _focus={{ outline: "none" }}
          onClick={handleReverseClick}
        >
          Change
        </Button>
      </GridItem>
    </Grid>
  );
};
