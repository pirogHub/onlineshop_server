import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/users/config/configuration';
import { SequelizeConfigService } from 'src/users/config/sequelizeConfig.service';

import { BoilerPartsModule } from '../../src/boiler-parts/boiler-parts.module';
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';

describe('Auth Service', () => {
    let app: INestApplication;
    let boilerPartsService: BoilerPartsService;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    useClass: SequelizeConfigService,
                }),
                ConfigModule.forRoot({
                    load: [databaseConfig],
                }),
                BoilerPartsModule,
            ],
        }).compile();

        boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);
        app = testModule.createNestApplication();

        await app.init();
    });

    it('should find by id', async () => {
        const part = await boilerPartsService.findOne(1);

        expect(part.dataValues).toEqual(
            expect.objectContaining({
                id: 1,
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                bestseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }),
        );
    });

    it('should find by name', async () => {
        const part = await boilerPartsService.findOneByName('Tenetur quaerat.');

        expect(part.dataValues).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: 'Tenetur quaerat.',
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                bestseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }),
        );
    });

    it('should find by find string', async () => {
        const parts = await boilerPartsService.findByString('qua');

        expect(parts.rows.length).toBeLessThanOrEqual(20);

        parts.rows.forEach((item) => {
            expect(item.name.toLowerCase()).toContain('qua');
            expect(item.dataValues).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    price: expect.any(Number),
                    boiler_manufacturer: expect.any(String),
                    parts_manufacturer: expect.any(String),
                    vendor_code: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    images: expect.any(String),
                    in_stock: expect.any(Number),
                    bestseller: expect.any(Boolean),
                    new: expect.any(Boolean),
                    popularity: expect.any(Number),
                    compatibility: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
            );
        });
    });

    it('should find bestsellers', async () => {
        const parts = await boilerPartsService.getBestsellers();

        parts.rows.forEach((item) => {
            expect(item.dataValues).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    price: expect.any(Number),
                    boiler_manufacturer: expect.any(String),
                    parts_manufacturer: expect.any(String),
                    vendor_code: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    images: expect.any(String),
                    in_stock: expect.any(Number),
                    bestseller: true,
                    new: expect.any(Boolean),
                    popularity: expect.any(Number),
                    compatibility: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
            );
        });
    });

    it('should find new parts', async () => {
        const parts = await boilerPartsService.getNew();

        parts.rows.forEach((item) => {
            expect(item.dataValues).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    price: expect.any(Number),
                    boiler_manufacturer: expect.any(String),
                    parts_manufacturer: expect.any(String),
                    vendor_code: expect.any(String),
                    name: expect.any(String),
                    description: expect.any(String),
                    images: expect.any(String),
                    in_stock: expect.any(Number),
                    bestseller: expect.any(Boolean),
                    new: true,
                    popularity: expect.any(Number),
                    compatibility: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
            );
        });
    });
});