import { getDb } from "../db/";
import * as sunlight from "./sunlight";

export function run(router) {
  const { db, User } = getDb();

  router.get("/", async (ctx, next) => {
    let val = null;
    const data = await User.findOne({ username: "yidong" });
    console.log("data", data);
    const result = {
      code: 200,
      response: data,
      ts: 12345,
    };
    ctx.response.body = result;
    return result;
  });

  // gboss apis
  sunlight.add(router);
}
