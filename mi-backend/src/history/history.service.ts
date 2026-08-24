import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

export interface HistoryRecord {
  operator: string;
  number1: number;
  number2: number;
  result: number;
  date: string;
}

const HISTORY_FILE = process.env.HISTORY_FILE ?? join(process.cwd(), 'history.json');

@Injectable()
export class HistoryService {

  async saveOperation(record: HistoryRecord): Promise<void> {
    const history = await this.readHistory();
    history.push(record);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
  }

  async getLastOperations(limit: number): Promise<HistoryRecord[]> {
    const history = await this.readHistory();
    return history.slice(-limit).reverse();
  }

  private async readHistory(): Promise<HistoryRecord[]> {
    try {
      const data = await fs.readFile(HISTORY_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

}
