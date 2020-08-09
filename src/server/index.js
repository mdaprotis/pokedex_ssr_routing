import express from "express";
import path from "path";
import React from "react";
import ReactDom from "react-dom/server";
import Main from "../client/components/Main/Main";
import serialize from "serialize-javascript";
import { matchPath } from "react-router-dom";
import routes from "../shared/routes";
import { StaticRouter, Route } from "react-router-dom";

const app = express();

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "..", "dist", "static"))
);

app.get("/:id", async (req, res) => {
  const active_route =
    routes.find((route) => {
      return matchPath(req.url, route);
    }) || {};

  const {
    pokemon_reduced_list,
    indexed_pokemon_list,
  } = await active_route.fetchInitialData(req.path);

  const root = (
    <html>
      <body>
        <div id="root">
          <StaticRouter location={req.url} context={{}}>
            <Main pokeList={pokemon_reduced_list} />
          </StaticRouter>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window._pokeList = ${serialize(pokemon_reduced_list)};
                     window._indexedPokeList = ${serialize(
                       indexed_pokemon_list
                     )};`,
          }}
        />
        <script src="/static/main.js"></script>
        <script
          src="https://kit.fontawesome.com/dea6daa23a.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
  const html = ReactDom.renderToString(root);

  res.send(html);
});

app.get("*", (req, res) => {
  res.redirect("/0");
});

app.listen(3000, () => {
  console.log("server started: http://localhost:3000");
});
