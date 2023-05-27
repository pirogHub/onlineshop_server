import { ApiOkResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { ShoppingCartService } from './shopping-cart.service';
import { Controller, Delete, UseGuards, Patch, Get, Param, Post, Body } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { GetAllResponse, TotalPriceRequest, TotalPriceResponse, UpdateCountRequest, UpdateCountResponse } from './types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @ApiOkResponse({ type: [GetAllResponse] })
    @Auth()
    @Get('')
    getAll(@User("id") id: string) {
        console.log("shopping-cart user id", id);

        return this.shoppingCartService.findAll(+id)
    }

    @ApiOkResponse({ type: UpdateCountResponse })
    @ApiBody({ type: UpdateCountRequest })
    @Auth()
    @Post('/add')
    addToCart(@Body() dto: AddToCartDto) {
        return this.shoppingCartService.add(dto)
    }

    @ApiOkResponse({ type: TotalPriceResponse })
    @ApiBody({ type: TotalPriceRequest })
    @Auth()
    @Patch('/update-count/:id')
    updateCount(@Body() { count }: { count: number }, @Param("id") id: string) {
        return this.shoppingCartService.updateCount(count, id)
    }

    @Auth()
    @Patch('/update-total-price/:id')
    updateTotalPrice(@Body() { total_price }: { total_price: number }, @Param("id") id: string) {
        return this.shoppingCartService.updateTotalPrice(total_price, id)
    }

    @Auth()
    @Delete('/delete-one/:partId')
    removeOne(@Param("partId") partId: string) {
        return this.shoppingCartService.remove(partId)
    }

    @Auth()
    @Delete('/delete-all')
    removeAll(@User("id") id: string) {
        console.log("/delete-all id", id);

        return this.shoppingCartService.removeAll(id)
    }
}
