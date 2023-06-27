import { Center, Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { AppBar } from "../components/appbar/AppBar";
// import { AppBar } from "../components/AppBar";
import styles from "../styles/Home.module.css";
import { Airdrop } from "../components/airdrop-from/AirdropForm";
// import { Airdrop } from "../components/AirdropForm";
import { TokenSwapForm } from "../components/TokenSwapForm";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Token Swap</title>
      </Head>
      <AppBar />

      <div className={styles.AppBody}>
        <div className={styles.formContainer}>
          {/* <Center> */}
          {/* <Box> */}
          <Airdrop />
          {/* <TokenSwapForm /> */}
          {/* </Box> */}
          {/* </Center> */}
        </div>{" "}
      </div>
    </div>
  );
};

export default Home;
