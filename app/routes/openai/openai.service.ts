import { Injectable } from '@nestjs/common';
import { DbService } from 'app/core/db/db.service';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenaiService {
    constructor(
        private db: DbService
    ) { }

    async openai() {

        const configuration = new Configuration({
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion(
            {
              model: "gpt-3.5-turbo",
              prompt: "Hello world",
            },
            {
              timeout: 1000,
              headers: {
                "Example-Header": "example",
              },
            }
          );
        console.log(completion.data.choices[0].text);
        const res = await completion.data.choices[0].text;
        return res;
    }
}
