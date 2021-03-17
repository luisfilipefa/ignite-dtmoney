import Modal from "react-modal";
import { createServer, Model } from "miragejs";
import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./TransactionsContext";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  );

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  createServer({
    models: {
      transaction: Model,
    },

    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: "Freelance de website",
            type: "deposit",
            category: "Dev",
            amount: 6000,
            createdAt: new Date("2021-02-12 09:00:00"),
          },
          {
            id: 2,
            title: "Aluguel",
            type: "withdraw",
            category: "Casa",
            amount: 1100,
            createdAt: new Date("2021-02-14 11:00:00"),
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";
      this.get("/transactions", () => {
        return this.schema.all("transaction");
      });

      this.post("/transactions", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create("transaction", data);
      });
    },
  });

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
