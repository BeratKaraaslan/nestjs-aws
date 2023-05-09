import { Injectable } from "@nestjs/common";
import {
  createCipheriv,
  createDecipheriv,
  scrypt,
} from "crypto";
import { promisify } from "util";
import configurations from "app/core/settings/configurations";
import * as moment from "moment";

@Injectable()
export class HashService {
  private iv: string = "1234567812345678";
  private key: any;

  async createHash() {
    this.key = (await promisify(scrypt)(
      configurations().secret,
      "salt",
      32
    )) as Buffer;
  }

  async encrypt(data: string): Promise<any> {
    await this.createHash();
    const cipher = createCipheriv("aes-256-cbc", this.key, this.iv);
    const encryptedText = Buffer.concat([cipher.update(data), cipher.final()]);
    return Buffer.from(encryptedText).toString("base64");
  }

  async decrypt(data: string): Promise<any> {
    await this.createHash();
    const parseHash = Buffer.from(data, "base64");
    const decipher = createDecipheriv("aes-256-cbc", this.key, this.iv);

    const decryptedText = Buffer.concat([
      decipher.update(parseHash),
      decipher.final(),
    ]);

    return Buffer.from(decryptedText).toString("ascii");
  }

  async to(string: string, type: string) {
    const model = {
      date: moment().unix(),
      type,
      data: string
    }
    const encode = await this.encrypt(JSON.stringify(model));
    return encode.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }

  async from(string: string, type: string) {

    try {
      string = (string + '===').slice(0, string.length + (string.length % 4));
      const cleanUrl = string.replace(/-/g, '+').replace(/_/g, '/');

      const decode = await this.decrypt(cleanUrl);
      const parse = JSON.parse(decode);

      const DateCheck = moment().isBetween(moment.unix(parse.date), moment.unix(parse.date).add(1, 'hours'));

      if (parse.type != type || !DateCheck)
        return false;

      return parse.data.split('|');
    } catch (e) {
      return false;
    }

  }

  async explode(string: string, separator: string = '|') {
    return string.split(separator);
  }
}
