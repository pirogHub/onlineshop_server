import { FindOneResponse, GetBestsellersResponse, GetNewResponse, SearchResponse, GetByNameRequest, GetByNameResponse } from './types/index';
import { ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { UseGuards, Post, Body, Param, Query, Controller, Get } from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PaginateAndFilterResponse } from './types';

@ApiTags("boiler-parts")
@Controller('boiler-parts')
export class BoilerPartsController {
    constructor(private readonly boilerPartsService: BoilerPartsService) { }

    @ApiOkResponse({ type: PaginateAndFilterResponse })
    // @UseGuards(AuthenticatedGuard)
    @Get()
    paginateAndFilter(@Query() query) {

        return this.boilerPartsService.paginateAndFilter(query)
    }

    @ApiOkResponse({ type: FindOneResponse })
    // @UseGuards(AuthenticatedGuard)
    @Get("find/:id")
    getOne(@Param("id") id: string) {
        return this.boilerPartsService.findOne(id)
    }

    @ApiOkResponse({ type: GetBestsellersResponse })
    // @UseGuards(AuthenticatedGuard)
    @Get("bestsellers")
    getBestsellers() {
        return this.boilerPartsService.getBestsellers()
    }

    @ApiOkResponse({ type: GetNewResponse })
    // @UseGuards(AuthenticatedGuard)
    @Get("new")
    getNew(@Param("id") id: string) {
        return this.boilerPartsService.getNew()
    }

    @ApiOkResponse({ type: SearchResponse })
    @ApiBody({ type: SearchResponse })
    // @UseGuards(AuthenticatedGuard)
    @Post("search")
    search(@Body() { search }: { search: string }) {
        return this.boilerPartsService.findByString(search)
    }

    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({ type: GetByNameRequest })
    // @UseGuards(AuthenticatedGuard)
    @Post("name")
    getByName(@Body() { name }: { name: string }) {
        return this.boilerPartsService.findOneByName(name)
    }

}
