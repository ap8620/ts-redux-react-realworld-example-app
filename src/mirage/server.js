// src/server.js
import { createServer, Model, RestSerializer } from "miragejs";
import articles from "./seedData/articles.json";
import tags from "./seedData/tags.json";


console.log('seedData', articles);

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      article: Model.extend(),
      tag: Model.extend(),
    },

    seeds(server) {
      server.create("article", articles.articles[0]);
      server.create("article", articles.articles[1]);
      server.create("article", articles.articles[2]);
    },

    serializers: {
      application: RestSerializer,
    },

    routes() {
      this.namespace = "api";
      this.urlPrefix = "https://api.realworld.io";

      this.get("/articles", (schema) => {
      console.log('first article', schema.articles.first());
        
        return {
          articles: schema.articles.all().models,
          articlesCount: 4
        };
      });

      this.get("/tags", (schema) => {
        return {
          tags: 
            [
              "tetrere",
              "ererere"
            ]
        }
      });
    },
  })

  console.log('mirage db', server.db);

  return server
}