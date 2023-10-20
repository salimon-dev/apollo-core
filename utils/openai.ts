import axios from "axios";

export function createOpenAiAxios() {
  return axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: "Bearer " + process.env["OPENAI_TOKEN"] },
  });
}

interface IEmbedResponse {
  data: { embedding: number[] }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export function openAiEmbed(body: string) {
  return createOpenAiAxios()
    .post<IEmbedResponse>("/embeddings", {
      input: body,
      model: "text-embedding-ada-002",
    })
    .then((response) => {
      const data = response.data.data;
      if (data.length > 0) return data[0].embedding;
    });
}
