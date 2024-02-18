"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();
  const requisicao = async () => {
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

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <button className="p-2 bg-blue-400 rounded-md" onClick={requisicao}>
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
    </div>
  );
}
