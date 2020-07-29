import Mock from "mockjs";
import json from "../mock/movie";

const res = json.Message.MessageBody;
let list = res.ChildrenObjectList.Object;
// list = [...list, ...list];
res.Total = list.length;

list.forEach((l, i) => (l.Index = i));
res.ChildrenObjectList.Object = list;

function getList(page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  console.log({ start, end, limit });
  return list.slice(start, end);
}

function delay(page, limit) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve([...getList(page, limit)]);
      },
      Mock.mock({
        "number|100-2000": 200,
      }).number
    );
  });
}

export function add(router) {
  router.get("/sunlight/movies/:id/:page/:limit", async (ctx, next) => {
    const { page, limit, id } = ctx.params;
    const result = await delay(+page, +limit);
    ctx.response.body = {
      ObjectID: id,
      Page: +page,
      Limit: +limit,
      ChildrenObjectList: {
        Total: res.Total,
        Object: result,
      },
    };
  });
}
