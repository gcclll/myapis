import cors from "koa2-cors";

function allowCors() {
  return cors({
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
    maxAge: 100,
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "anonymous",
    ],
  });
}

export default { allowCors };
