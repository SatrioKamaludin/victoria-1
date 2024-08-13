const { Op } = require('sequelize');
const { Customer } = require('../models');

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
                [Op.like]: `%${nama}%`
            };
        }

        if (alamat) {
            whereClause.alamat = {
                [Op.like]: `%${alamat}%`
            };
        }

        if (kota) {
            whereClause.kota = {
                [Op.like]: `%${kota}%`
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

        const customers = await Customer.findAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: pageOffset,
            limit: pageSizeNumber   
        });

        res.json(customers);
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
            return ['createdAt', 'DESC'];
        case 'oldestCreated':
            return ['createdAt', 'ASC'];
        case 'recentUpdated':
            return ['updatedAt', 'DESC'];
        case 'oldestUpdated':
            return ['updatedAt', 'ASC'];
        default:
            return ['nama', 'ASC'];
    }
};
