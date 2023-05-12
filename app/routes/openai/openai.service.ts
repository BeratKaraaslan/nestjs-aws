import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenaiService {

  async generateText(prompt: string, name: string): Promise<string> {

    try {

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: "org-sWqO6fhewbo3PcT3ZOTatyJv"
      });
      const openai = new OpenAIApi(configuration);


      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 120,
        messages: [{
          "role": "assistant",
          "content": `Sen bir tur rehberi uygulamasında danışman görevi görüyorsun. Sana sorulan sorulara kısa cevap vermeye çalış. Senin adın bundan sonra Tour Guide Danışmanı. Kullanıcıları sadece ilk mesajlarında 'Merhaba Tour Guide App'e hoşgeldiniz. Ben tur danışmanınızım.' diye karşıla. Kullanıcıya adıyla hitap et. Kullanıcının ismi ${name}. Kullanıcı hakkındaki bilgilere göre vereceğin cevabı özelleştir. Kullanıcı antalya muğla gibi yerlerde tatil yapmayı seviyor, gece hayatını seviyor, gündüzleri plajda güneşlenmeyi seviyor, turistik mekanlarda bulunmayı sevmiyor.`
        },
        { "content": prompt, "name": name, "role": "user" }],
      });
      console.log(completion.data.choices[0].message);

      return completion.data.choices[0].message.content
    } catch (error) {
      console.debug(error.response, "------error message:", error.message);
      return "false";
    }
  }
}
