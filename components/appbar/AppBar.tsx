import { FC } from "react";
import styles from "./styles.module.css";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import solanaLogo from "../../public/solanaLogo.png";

export const AppBar: FC = () => {
  const navItems = [
    { id: 1, label: "exchange", link: "#" },
    { id: 2, label: "songs", link: "#" },
    { id: 3, label: "pool", link: "#" },
  ];

  return (
    <div className={styles.AppHeader}>
      <div>
        <Link href="/">
          <Image
            alt="Solana"
            src={solanaLogo}
            height={27}
            width={175}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
      <div className={styles.leftContainer}>
        {navItems.map((item) => (
          <div key={item.id}>
            <Link href={item.link}>
              <span className={styles.navItem}>{item.label}</span>
            </Link>
          </div>
        ))}

        <div className={styles.searchContainer}>
          <Input
            placeholder="Search"
            _placeholder={{ padding: "0 5px", color: "white" }}
            _focus={{
              caretColor: "#3B82F6",
              border: "1px solid #3B82F6",
              _placeholder: { color: "#3B82F6" },
            }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            style={{
              background: "#3B82F6",
              borderRadius: ".5rem",
              fontWeight: 600,
              color: "white",
            }}
            _focus={{ outline: "none" }}
          >
            Select Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};
