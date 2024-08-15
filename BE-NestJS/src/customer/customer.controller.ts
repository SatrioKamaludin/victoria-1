/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { FileInterceptor } from '@nestjs/platform-express';

const initialEndpoint = '/api/';
@Controller(`${initialEndpoint}customers`)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async findAll(
        @Query('sort') sort?: string,
        @Query('nama') nama?: string,
        @Query('alamat') alamat?: string,
        @Query('kota') kota?: string,
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10
    ): Promise<{
        data: Customer[];
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number
    }> {
        const result = await this.customerService.findAll(sort, nama, alamat, kota, page, +pageSize);
        return result;
    }

    @Post()
    @UseInterceptors(FileInterceptor(''))
    async addCustomer(
        @Body('nama') nama: string,
        @Body('alamat') alamat: string,
        @Body('kota') kota: string
    ): Promise<{ message: string, data: Customer }> {
        return this.customerService.addCustomer(nama, alamat, kota);
    }

    @Put(':no')
    @UseInterceptors(FileInterceptor(''))
    async updateCustomer(
        @Param('no') no: number,
        @Body('nama') nama: string,
        @Body('alamat') alamat: string,
        @Body('kota') kota: string
    ): Promise<{ message: string, data: Customer }> {
        return this.customerService.updateCustomer(no, nama, alamat, kota);
    }

    @Delete(':no')
    async deleteCustomer(@Param('no') no: number): Promise<{ message: string }> {
        return this.customerService.deleteCustomer(no);
    }
}
