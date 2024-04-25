/* eslint-disable no-console */
// src/server.js
import { createServer, Model, RestSerializer } from "miragejs";
import articles from "./seedData/articles.json";
import { uniq } from "ramda";
// import tags from "./seedData/tags.json";


console.log('seedData', articles);

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      article: Model.extend(),
    },

    seeds(server) {
      const sandboxData = localStorage.getItem('sandboxData');
      console.log('anish sandBox data', sandboxData);
      if (!sandboxData) {
        console.log('anish creating sandboxData');
        // only seed when there is nothing in localStorage
        // server.create("article", articles.articles[0]);
        // server.create("article", articles.articles[1]);
        // server.create("article", articles.articles[2]);
        const seedData = {
          articles: articles,
          //tags: tags.tags
        };
        
        server.db.loadData(seedData);
        
        // server.create("tag", tags.tags[0]);
        // server.create("tag", tags.tags[1]);
        // const localStorageDB = {
        //   articles: server.db.articles
        // };
        localStorage.setItem('sandboxData', JSON.stringify(seedData));
      } else {
        server.db.loadData(JSON.parse(sandboxData));
      }
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
          articlesCount: schema.articles.all().models.length
        };
      });

      this.get("/tags", (schema) => {
        // HAD TO DO LOGIC HERE
        let allTags = [];
        schema.articles.all().models.forEach(x => {
          allTags = uniq([...allTags, ...x.tagList]);
        });
        console.log('anish get tags', allTags);
        return {
          tags: allTags
        }
      });
    },
  })

  console.log('mirage db', server.db);

  return server
}