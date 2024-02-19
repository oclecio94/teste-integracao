import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token } = await req.json();
  let clientId = process.env.CLIENT_ID;
  let secretKey = process.env.SECRET_KEY;

  //esse token expira em 1 minuto
  let code = "4170fc3923e57fb3b5d8605958b570205c637b8c";

  // let access_token = "";

  // let refresh_token = "";

  const tokenData = await prisma.token.findUnique({ where: { id: 1 } });

  let access_token = tokenData?.access_token;

  let refresh_token = tokenData?.refresh_token;

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

      await prisma.token.create({
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        },
      });
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
          token: refresh_token!,
        }).toString(),
      });

      data = await res.json();

      await prisma.token.update({
        where: {
          id: 1,
        },
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        },
      });
    }

    // //@ts-ignore
    // access_token = data.access_token;
    // //@ts-ignore
    // refresh_token = data.refresh_token;

    console.log("data", data);
    console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function GET() {
  try {
    const tokenData = await prisma.token.findUnique({ where: { id: 1 } });

    let access_token = tokenData?.access_token;

    const res = await fetch("https://www.bling.com.br/Api/v3/produtos", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}