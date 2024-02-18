import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  let clientId = "c6baf8c429a993382260c1f351f3aee8ede97de8";
  let secretKey =
    "fc110af2bf135f345cf99b84e5e01cc88277ff6abbf4e5be9852edc4f1f5";

  let code = "191391b5443084bb4f577a885434be055970baad";

  let access_token = "";

  let refresh_token = "";

  let clientCredentials = Buffer.from(`${clientId}:${secretKey}`).toString(
    "base64"
  );

  let data;

  try {
    if (token == "token") {
      const res = await fetch("https://www.bling.com.br/Api/v3/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "1.0",
          Authorization: `Basic ${clientCredentials}`,
        },

        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
        }).toString(),
      });

      data = await res.json();
    } else if (token == "refresh") {
      const res = await fetch("https://www.bling.com.br/Api/v3/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "1.0",
          Authorization: `Basic ${clientCredentials}`,
        },

        body: new URLSearchParams({
          grant_type: "refresh_token",
          token: refresh_token,
        }).toString(),
      });

      data = await res.json();
    }

    //@ts-ignore
    access_token = data.access_token;
    //@ts-ignore
    refresh_token = data.refresh_token;

    console.log("data", data);
    console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}
