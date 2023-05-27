import { FindOneResponse, GetBestsellersResponse, GetNewResponse, SearchResponse, GetByNameRequest, GetByNameResponse } from './types/index';
import { ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { UseGuards, Post, Body, Param, Query, Controller, Get } from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { PaginateAndFilterResponse } from './types';

@ApiTags("boiler-parts")
@Controller('boiler-parts')
export class BoilerPartsController {
    constructor(private readonly boilerPartsService: BoilerPartsService) { }

    @ApiOkResponse({ type: PaginateAndFilterResponse })
    @Get()
    paginateAndFilter(@Query() query) {

        return this.boilerPartsService.paginateAndFilter(query)
    }

    @ApiOkResponse({ type: FindOneResponse })
    @Get("find/:id")
    getOne(@Param("id") id: string) {
        return this.boilerPartsService.findOne(id)
    }

    @ApiOkResponse({ type: GetBestsellersResponse })
    @Get("bestsellers")
    getBestsellers() {
        return this.boilerPartsService.getBestsellers()
    }

    @ApiOkResponse({ type: GetNewResponse })
    @Get("new")
    getNew(@Param("id") id: string) {
        return this.boilerPartsService.getNew()
    }

    @ApiOkResponse({ type: SearchResponse })
    @ApiBody({ type: SearchResponse })
    @Post("search")
    search(@Body() { search }: { search: string }) {
        return this.boilerPartsService.findByString(search)
    }

    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({ type: GetByNameRequest })
    @Post("name")
    getByName(@Body() { name }: { name: string }) {
        return this.boilerPartsService.findOneByName(name)
    }

}
