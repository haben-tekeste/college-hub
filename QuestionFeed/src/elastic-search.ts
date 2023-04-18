import { Client } from "@elastic/elasticsearch";

class ElasticSearchClient {
  private _client?: Client;
  async connect(id: string, username: string, password: string) {
    this._client = new Client({
      cloud: {
        id,
      },
      auth: {
        username,
        password,
      },
    });
    console.log("Connected to elastic cloud");

    return new Promise((resolve, reject) => {
      try {
        resolve(this._client);
      } catch (error) {
        reject(error);
      }
    });
  }

  get Client() {
    if (!this._client)
      throw new Error("Can't access elastic client before connection");
    return this._client;
  }
  async createIndex(indexName: string) {
    if (!this._client)
      throw new Error("Can't access elastic client before connection");
    const result = await this._client.indices.create({ index: indexName });
    console.log(`Index ${indexName} created`);
    return new Promise((resolve, reject) => {
      try {
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createPost(
    indexName: string,
    data: { title: string; content: string; id: string }
  ) {
    if (!this._client)
      throw new Error("Can't access elastic client before connection");
    const result = await this._client.index({
      index: indexName,
      document: {
        title: data.title,
        content: data.content,
        id: data.id,
      },
    });
    console.log("Post created");
    await this._client.indices.refresh({ index: indexName });
    return new Promise((resolve, reject) => {
      try {
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async fetchPosts(term: string, indexName: string) {
    if (!this._client)
      throw new Error("Can't access elastic client before connection");
    const {
      hits: { hits },
    } = await this._client.search({
      index: indexName,
      query: {
        multi_match: {
          query: term,
          fields: ["title^3", "content^2"],
          fuzziness: "AUTO",
          prefix_length: 2,
        },
      },
    });
    return new Promise((resolve, reject) => {
      try {
        resolve(hits);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const elasticClient = new ElasticSearchClient();
