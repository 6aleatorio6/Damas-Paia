import { Image } from "react-bootstrap";

interface props {
  text: string;
}

export default function SignHead({ text }: props) {
  return (
    <div className="d-flex justify-content-between ">
      <Image
        src="/imgs/damaspaiaIcon.png"
        width={30}
        height={30}
        alt="tabuleiro"
      />
      <h3 className="text-center pb-3">{text}</h3>
      <Image
        src="/imgs/damaspaiaIcon.png"
        width={30}
        height={30}
        alt="tabuleiro"
      />
    </div>
  );
}
