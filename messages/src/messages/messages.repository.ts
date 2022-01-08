import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {
    private async getFile() {
        const contents = await readFile('messages.json', 'utf8');
        return JSON.parse(contents);
    }

    public async findOne(id: string) {
        const messages = await this.getFile();
        return messages[id];
    }

    public async findAll() {
        const messages = await this.getFile();
        return messages;
    }

    public async create(content: string) {
        const messages = await this.getFile();

        const id = Math.floor(Math.random() * 999);

        messages[id] = { id, content };

        await writeFile('messages.json', JSON.stringify(messages));
    }
}