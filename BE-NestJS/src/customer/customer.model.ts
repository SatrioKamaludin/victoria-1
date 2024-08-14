import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'customer',
  timestamps: true,
  createdAt: 'created_at', // Map to the correct column name
  updatedAt: 'updated_at',
})
export class Customer extends Model<Customer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  no: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nama: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  alamat: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  kota: string;
}
