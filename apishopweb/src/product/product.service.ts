/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createCatDto: Product): Promise<Product> {
    const createdCat = new this.productModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }
  async update(id: string, updateSeverDto: Product): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, updateSeverDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    await this.productModel.findByIdAndRemove(id).exec();
    return {
      text: 'Xoá thành công'
    }
  }
}
