import React from "react";

enum CoresTab {
  white,
  black,
}

interface Peca {
  corPeca: CoresTab;
  estado: "comum" | "capturada" | "rainha";
}

interface PropsTCasa {
  corDaCasa: CoresTab;
  temPeca: Peca | null;
}

function Casa({ corDaCasa, temPeca }: PropsTCasa) {
  let peca: React.JSX.Element | undefined;

  if (temPeca) {
    console.log("c");

    const corPeca = CoresTab[temPeca.corPeca];

    peca = (
      <div className={`bg-${corPeca}  rounded-5 m-auto border border-3`}></div>
    );
  }

  return <div className={`bg-${CoresTab[corDaCasa]} Peca `}>{peca}</div>;
}

interface PropsTabuleiro {
  dimensao: number;
}

export default function Tabuleiro({ dimensao }: PropsTabuleiro) {
  let arrayInfeliz: any[][] = [];

  let simEnao = false;
  for (let i = 0; i < dimensao; i++) {
    simEnao = !simEnao;
    arrayInfeliz[i] = [];

    for (let j = 0; j < dimensao; j++) {
      const corDaCasa = simEnao ? CoresTab.white : CoresTab.black;
      arrayInfeliz[i].push(Casa({ corDaCasa, temPeca: null }));
      simEnao = !simEnao;
    }
  }

  return (
    <div className="">
      {arrayInfeliz.map((e, i) => {
        return (
          <div key={i} className="d-flex border border-1 col_paia">
            {e}
          </div>
        );
      })}
    </div>
  );
}
