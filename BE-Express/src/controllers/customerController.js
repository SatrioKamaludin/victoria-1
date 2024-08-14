const { Op } = require('sequelize');
const { Customer } = require('../models');
const multer = require('multer');

exports.getAllCustomers = async (req, res) => {
    try {
        const {
            sort = 'namaAsc',
            nama = '',
            alamat = '',
            kota = '',
            page = 1,
            pageSize = 10
        } = req.query;

        const [sortField, sortOrder] = parseSort(sort);

        const whereClause = {};

        if (nama) {
            whereClause.nama = {
                [Op.iLike]: `%${nama}%`
            };
        }

        if (alamat) {
            whereClause.alamat = {
                [Op.iLike]: `%${alamat}%`
            };
        }

        if (kota) {
            whereClause.kota = {
                [Op.iLike]: `%${kota}%`
            };
        }

        const pageNumber = parseInt(page);
        const pageSizeNumber = parseInt(pageSize);

        if (isNaN(pageNumber) || pageNumber < 1) {
            res.status(400).json({ error: 'Invalid page number' });
        }

        if (isNaN(pageSizeNumber) || pageSizeNumber < 1) {
            res.status(400).json({ error: 'Invalid page size' });
        }

        const pageOffset = (pageNumber - 1) * pageSizeNumber;

        const totalRecords = await Customer.count({ where: whereClause });

        const customers = await Customer.findAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: pageOffset,
            limit: pageSizeNumber
        });

        res.json({
            data: customers,
            totalRecords: totalRecords,
            currentPage: pageNumber,
            pageSize: pageSizeNumber,
            totalPages: Math.ceil(totalRecords / pageSizeNumber)
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const parseSort = (sort) => {
    switch (sort) {
        case 'namaAsc':
            return ['nama', 'ASC'];
        case 'namaDesc':
            return ['nama', 'DESC'];
        case 'alamatAsc':
            return ['alamat', 'ASC'];
        case 'alamatDesc':
            return ['alamat', 'DESC'];
        case 'kotaAsc':
            return ['kota', 'ASC'];
        case 'kotaDesc':
            return ['kota', 'DESC'];
        case 'recentCreated':
            return ['created_at', 'DESC'];
        case 'oldestCreated':
            return ['created_at', 'ASC'];
        case 'recentUpdated':
            return ['updated_at', 'DESC'];
        case 'oldestUpdated':
            return ['updated_at', 'ASC'];
        default:
            return ['nama', 'ASC'];
    }
};

const upload = multer();

exports.addCustomer = [
    upload.none(),
    async (req, res) => {
        try {
            const { nama, alamat, kota } = req.body;

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
                return res.status(400).json({ error: errorBlank });
            }

            const totalCustomers = await Customer.max('no');
            const newNo = totalCustomers ? totalCustomers + 1 : 1;

            const customer = await Customer.create({
                no: newNo,
                nama,
                alamat,
                kota
            });

            res.status(201).json({
                message: 'Customer added successfully',
                data: customer
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];

exports.updateCustomer = [
    upload.none(),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { nama, alamat, kota } = req.body;

            const customer = await Customer.findByPk(id);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
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

            customer.updated_at = new Date();

            await customer.save();
            res.status(200).json({
                message: 'Customer updated successfully',
                data: customer
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
]

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}