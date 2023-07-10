import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenaiService {
  private chatSessions: { [key: string]: Array<any> } = {};
  private retryLimit = 3;

  async generateText(prompt: string, name: string): Promise<string> {
    let retryCount = 0;

    while (retryCount < this.retryLimit) {
      try {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
          organization: "org-sWqO6fhewbo3PcT3ZOTatyJv"
        });
        const openai = new OpenAIApi(configuration);

        const chatHistory = this.getChatHistory(name);
        chatHistory.push({ role: 'user', content: prompt });

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 120,
          messages: chatHistory
        });

        const assistantMessage = completion.data.choices[0].message.content.trim();
        chatHistory.push({ role: 'assistant', content: assistantMessage });

        return assistantMessage
      } catch (error) {
        console.debug(error.response, "------error message:", error.message);
        return "false";
      }
    }
  }

  getChatHistory(name: string): Array<any> {
    if (!(name in this.chatSessions)) {
      this.chatSessions[name] = [
        { role: 'assistant', content: `Sen bir tur rehberi uygulamasında danışman görevi görüyorsun. Sana sorulan sorulara kısa cevap vermeye çalış. Senin adın bundan sonra Tour Guide Danışmanı. Kullanıcıları sadece ilk mesajlarında 'Merhaba Tour Guide App'e hoşgeldiniz. Ben tur danışmanınızım.' diye karşıla. Kullanıcıya adıyla hitap et. Kullanıcının ismi ${name}. Kullanıcı hakkındaki bilgilere göre vereceğin cevabı özelleştir. Kullanıcı antalya muğla gibi yerlerde tatil yapmayı seviyor, gece hayatını seviyor, gündüzleri plajda güneşlenmeyi seviyor, turistik mekanlarda bulunmayı sevmiyor.` },
      ];
    }
    return this.chatSessions[name];
  }
}
