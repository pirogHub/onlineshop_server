import { BoilerPartsService } from './../boiler-parts/boiler-parts.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart)
        private shoppingCartModel: typeof ShoppingCart,
        private readonly usersService: UsersService,
        private readonly boilerPartsService: BoilerPartsService
    ) { }


    async findAll(userId: number | string): Promise<ShoppingCart[]> {

        return this.shoppingCartModel.findAll({ where: { userId } })
    }

    async add(dto: AddToCartDto) {
        const cart = new ShoppingCart()
        const user = await this.usersService.findOne({ where: { username: dto.username } })
        const part = await this.boilerPartsService.findOne(dto.partId)

        cart.userId = +user.id
        cart.partId = part.id
        cart.boiler_manufacturer = part.boiler_manufacturer
        cart.parts_manufacturer = part.parts_manufacturer
        cart.price = part.price
        cart.in_stock = part.in_stock
        cart.image = JSON.parse(part.images)[0]
        cart.name = part.name
        cart.total_price = part.price


        return cart.save()
    }

    async updateCount(count: number, id: string | number): Promise<{ count: number }> {
        await this.shoppingCartModel.update({ count }, { where: { id } })
        console.log("count", count);
        console.log("id", id);

        const cart = await this.shoppingCartModel.findOne({ where: { id } })

        return { count: cart.count }
    }

    async updateTotalPrice(total_price: number, id: number | string): Promise<{ total_price: number }> {
        await this.shoppingCartModel.update({ total_price }, { where: { id } })
        const cart = await this.shoppingCartModel.findOne({ where: { id } })
        return { total_price: cart.total_price }
    }

    async remove(partId: number | string): Promise<void> {
        const cart = await this.shoppingCartModel.findOne({ where: { partId } })
        await cart.destroy()
    }

    async removeAll(userId: number | string): Promise<void> {
        await this.shoppingCartModel.destroy({ where: { userId } })
    }
}
