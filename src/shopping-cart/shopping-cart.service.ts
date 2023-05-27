import { BoilerPartsService } from './../boiler-parts/boiler-parts.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { AuthService } from 'src/auth/auth.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart)
        private shoppingCartModel: typeof ShoppingCart,
        private readonly authService: AuthService,
        private readonly boilerPartsService: BoilerPartsService
    ) { }


    async findAll(query: any): Promise<ShoppingCart[]> {
        try {

            const data = await this.shoppingCartModel.findAll(query)
            return data
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async findOne(query: any): Promise<ShoppingCart> {
        try {

            const cart = await this.shoppingCartModel.findOne(query)
            return cart
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async update(arg1: any, arg2: any) {
        try {

            const flag = await this.shoppingCartModel.update(arg1, arg2)
            return flag
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async add(dto: AddToCartDto) {
        const cart = new ShoppingCart()
        const user = await this.authService.findOne({ where: { username: dto.username } })
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
        const flag = await this.update({ count }, { where: { id } })


        const cart = await this.findOne({ where: { id } })

        return { count: cart.count }
    }

    async updateTotalPrice(total_price: number, id: number | string): Promise<{ total_price: number }> {
        await this.update({ total_price }, { where: { id } })
        const cart = await this.findOne({ where: { id } })
        return { total_price: cart.total_price }
    }

    async remove(partId: number | string): Promise<void> {
        const cart = await this.findOne({ where: { partId } })
        await cart.destroy()
    }

    async removeAll(userId: number | string): Promise<void> {
        try {

            await this.shoppingCartModel.destroy({ where: { userId } })
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
