
import React, { CSSProperties, useRef } from "react";


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

  return <div className={`bg-${CoresTab[corDaCasa]} Peca ratio ratio-1x1 `}>{peca}</div>;
}

interface PropsTabuleiro {
  dimensao: number;
  tamanhoPx?: string
}

export default function Tabuleiro({ dimensao, tamanhoPx = "500px" }: PropsTabuleiro) {

  

  const style:CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${dimensao} ,1fr)`,
    width: tamanhoPx,
  }


  let arrayInfeliz: any[][] = [];

  
  let simEnaoY = false
  for (let i = 0; i < dimensao; i++) {
    simEnaoY = !simEnaoY;
    arrayInfeliz[i] = [];
    
    let simEnaoX = simEnaoY;
    for (let j = 0; j < dimensao; j++) {
      const corDaCasa = simEnaoX ? CoresTab.white : CoresTab.black;
      arrayInfeliz[i].push(Casa({ corDaCasa, temPeca: null }));
      simEnaoX = !simEnaoX;
    }
  }


  return (
    <div style={style} className="border border-2 p-0 ">
      {arrayInfeliz.map((e, i) => e)}
    </div>
  );
}
