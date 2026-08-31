import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryRecord } from './history.service';

@Controller('history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService) {}

    @Get()
    public getHistory(): Promise<HistoryRecord[]> {
        return this.historyService.getLastOperations(5);
    }

}