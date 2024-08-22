/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './customer.model';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer)
        private customerModel: typeof Customer,
    ) { }

    async findAll(
        sort?: string,
        nama?: string,
        alamat?: string,
        kota?: string,
        page?: number,
        pageSize?: number
    ): Promise<{
        data: Customer[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number
    }> {
        try {
            const order = this.getOrder(sort);
            const searchClause = this.buildSearchClause(nama, alamat, kota);
            const offset = (page - 1) * pageSize;
            const { rows: customers, count: totalData } = await this.customerModel.findAndCountAll({
                where: searchClause,
                limit: pageSize,
                offset,
                order
            })

            const totalPages = Math.ceil(totalData / pageSize);
            return { 
                data: customers, 
                currentPage: page, 
                pageSize, 
                totalPages, 
                totalRecords: totalData 
            };
        } catch (error) {
            throw new InternalServerErrorException({ error });
        }
    }

    private getOrder(sort?: string): [string, 'ASC' | 'DESC'][] {
        const order: [string, 'ASC' | 'DESC'][] = [];

        switch (sort) {
            case 'noAsc':
                order.push(['no', 'ASC']);
                break;
            case 'noDesc':
                order.push(['no', 'DESC']);
                break;
            case 'namaAsc':
                order.push(['nama', 'ASC']);
                break;
            case 'namaDesc':
                order.push(['nama', 'DESC']);
                break;
            case 'alamatAsc':
                order.push(['alamat', 'ASC']);
                break;
            case 'alamatDesc':
                order.push(['alamat', 'DESC']);
                break;
            case 'kotaAsc':
                order.push(['kota', 'ASC']);
                break;
            case 'kotaDesc':
                order.push(['kota', 'DESC']);
                break;
            case 'createdAsc':
                order.push(['created_at', 'ASC']);
                break;
            case 'createdDesc':
                order.push(['created_at', 'DESC']);
                break;
            default:
                order.push(['no', 'ASC']);
                break;
        }

        return order;
    }

    private buildSearchClause(nama: string, alamat: string, kota: string): any {
        const searchClause: any = {};
        if (nama) {
            searchClause.nama = {
                [Op.iLike]: `%${nama}%`
            };
        }

        if (alamat) {
            searchClause.alamat = {
                [Op.iLike]: `%${alamat}%`
            };
        }

        if (kota) {
            searchClause.kota = {
                [Op.iLike]: `%${kota}%`
            };
        }
        return searchClause;
    };

    async addCustomer(nama: string, alamat: string, kota: string): Promise<{message: string, data: Customer}> {
        this.addFormVerification(nama, alamat, kota);
        try {
            const totalCustomer = await this.customerModel.max('no');
            const newNo = totalCustomer ? Number(totalCustomer) + 1 : 1;

            const customer = await this.customerModel.create({
                no: newNo,
                nama,
                alamat,
                kota
            });

            return {
                message: 'Customer added successfully',
                data: customer
            };
        } catch (error) {
            throw new InternalServerErrorException({ error });
        }
    }

    private addFormVerification(nama: string, alamat: string, kota: string): void {

        const errorBlank = [];

        if (!nama) {
            errorBlank.push('nama cannot be blank');
        }

        if (!alamat) {
            errorBlank.push('alamat cannot be blank');
        }

        if (!kota) {
            errorBlank.push('kota cannot be blank');
        }

        if (errorBlank.length > 0) {
            throw new BadRequestException({ error: errorBlank });
        }
    }

    async updateCustomer(no: number, nama: string, alamat: string, kota: string): Promise<{message: string, data: Customer}> {
        try {
            const customer = await this.customerModel.findByPk(no);
            if (!customer) {
                throw new NotFoundException('Customer not found');
            }

            if (nama) {
                customer.nama = nama;
            }

            if (alamat) {
                customer.alamat = alamat;
            }

            if (kota) {
                customer.kota = kota;
            }

            await customer.save();
            return {
                message: 'Customer updated successfully',
                data: customer
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException({ error });
        }
    }

    async deleteCustomer(no: number): Promise<{message: string}> {
        try {
            const customer = await this.customerModel.findByPk(no);
            if (!customer) {
                throw new NotFoundException('Customer not found');
            }
            await customer.destroy();
            return { message: 'Customer deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
