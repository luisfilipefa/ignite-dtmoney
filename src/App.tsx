import Modal from "react-modal";
import { createServer, Model } from "miragejs";
import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

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
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}
