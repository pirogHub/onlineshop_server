import { IBoilerPartsFilter, IBoilerPartsQuery } from './types/index';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoilerParts } from './boiler-parts.model';

import { Op } from "sequelize"

@Injectable()
export class BoilerPartsService {
    constructor(
        @InjectModel(BoilerParts)
        private boilerPartsModel: typeof BoilerParts
    ) { }

    async findAndCountAll(query: any) {
        try {
            const data = await this.boilerPartsModel.findAndCountAll(query)
            return data
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async findOne_withErrorHandler(query: any) {
        try {
            const data = await this.boilerPartsModel.findOne(query)
            return data
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async paginateAndFilter(query: IBoilerPartsQuery): Promise<{ count: number, rows: BoilerParts[], offset: number }> {
        const limit = +query.limit ? +query.limit : 20
        let offset = +query.offset > 0 ? +query.offset : 0

        const filter = {} as Partial<IBoilerPartsFilter>



        if (query.priceFrom && query.priceTo) {
            filter.price = {
                [Op.between]: [+query.priceFrom, +query.priceTo]
            }
        }
        if (query.boiler) {
            filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler))
        }
        if (query.parts) {
            filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts))
        }


        // let data = await this.boilerPartsModel.findAndCountAll({ limit, offset: offset * 20, where: filter })
        let data = await this.findAndCountAll({ limit, offset: offset * 20, where: filter })

        if (offset * 20 > data.count) {
            offset = Math.ceil(data.count / limit)
            // data = await this.boilerPartsModel.findAndCountAll({ limit, offset: offset * 20, where: filter })
            data = await this.findAndCountAll({ limit, offset: offset * 20, where: filter })

        }
        const dataWithOffset = { count: data.count, rows: data.rows, offset }

        return dataWithOffset
    }


    async getNew(): Promise<{ count: number, rows: BoilerParts[] }> {
        // return this.boilerPartsModel.findAndCountAll({ where: { new: true } })
        return this.findAndCountAll({ where: { new: true } })
    }


    async findOne(id: number | string): Promise<BoilerParts> {
        // return this.boilerPartsModel.findOne({ where: { id } })
        return this.findOne_withErrorHandler({ where: { id } })
    }


    async findOneByName(name: string): Promise<BoilerParts> {
        // return this.boilerPartsModel.findOne({ where: { name } })
        return this.findOne_withErrorHandler({ where: { name } })
    }

    async findByString(str: string): Promise<{ count: number, rows: BoilerParts[] }> {
        return this.findAndCountAll({
            limit: 20,
            where: { name: { [Op.like]: `%${str}%` } }
        })
        // return this.boilerPartsModel.findAndCountAll({
        //     limit: 20,
        //     where: { name: { [Op.like]: `%${str}%` } }
        // })
    }


    async getBestsellers(): Promise<{ count: number, rows: BoilerParts[] }> {
        // return this.boilerPartsModel.findAndCountAll({ where: { bestseller: true } })
        return this.findAndCountAll({ where: { bestseller: true } })
    }
}

