import { ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ShoppingCartService } from './shopping-cart.service';
import { Controller, Delete, UseGuards, Patch, Get, Param, Post, Body } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { GetAllResponse, TotalPriceRequest, TotalPriceResponse, UpdateCountRequest, UpdateCountResponse } from './types';

@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get('/:userId')
    getAll(@Param("userId") userId: string) {
        return this.shoppingCartService.findAll(+userId)
    }

    @ApiOkResponse({ type: UpdateCountResponse })
    @ApiBody({ type: UpdateCountRequest })
    @UseGuards(AuthenticatedGuard)
    @Post('/add')
    addToCart(@Body() dto: AddToCartDto) {
        return this.shoppingCartService.add(dto)
    }

    @ApiOkResponse({ type: TotalPriceResponse })
    @ApiBody({ type: TotalPriceRequest })
    @UseGuards(AuthenticatedGuard)
    @Patch('/update-count/:id')
    updateCount(@Body() { count }: { count: number }, @Param("id") id: string) {
        return this.shoppingCartService.updateCount(count, id)
    }

    @UseGuards(AuthenticatedGuard)
    @Patch('/update-total-price/:id')
    updateTotalPrice(@Body() { total_price }: { total_price: number }, @Param("id") id: string) {
        return this.shoppingCartService.updateTotalPrice(total_price, id)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/delete-one/:partId')
    removeOne(@Param("partId") partId: string) {
        return this.shoppingCartService.remove(partId)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/delete-all/:userId')
    removeAll(@Param("userId") userId: string) {
        return this.shoppingCartService.removeAll(userId)
    }
}
