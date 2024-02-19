"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();
  const [product, setProduct] = useState([]);

  const reqData = async () => {
    const res = await fetch("http://localhost:3000/api/teste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: "token" }),
    });

    console.log("res", res);
    const dataApi = await res?.json();
    console.log("dataApi", dataApi);
    setData(dataApi);
  };

  const reqProducts = async () => {
    const res = await fetch("http://localhost:3000/api/teste");

    console.log("produtos", res);
    const dataApi = await res?.json();
    console.log("data produtos", dataApi);
    setProduct(dataApi.data);
  };

  console.log("data", data);
  console.log("product", product);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <button className="p-2 bg-blue-400 rounded-md" onClick={reqData}>
        chamar api
      </button>
      <div className="flex flex-col">
        <p>dados:</p>
        {data && (
          <>
            <p>{data.acess_token}</p>
            <p>{data.expires_in}</p>
            <p>{data.token_type}</p>
            <p>{data.scope}</p>
            <p>{data.refresh_token}</p>
          </>
        )}
      </div>
      <div className="flex flex-col">
        <button className="p-2 bg-red-400 rounded-md" onClick={reqProducts}>
          chamar produto
        </button>
        <p>Produto:</p>
        {product.map((p: any, i: any) => (
          <div className="flex flex-col" key={i}>
            <p>id: {p.id}</p>
            <p>nome: {p.nome}</p>
            <p>codigo: {p.codigo}</p>
            <p>preco: {p.preco}</p>
            <p>tipo: {p.tipo}</p>
            <p>situacao: {p.situacao}</p>
            <p>formato: {p.formato}</p>
            <p>descrição: {p.descricaoCurta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
