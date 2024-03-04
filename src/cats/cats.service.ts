import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Cat as ModelSchema } from './schemas/cat.schema';
import { CreateCatDto as CreateDto } from './dto/create-cat.dto';
import { UpdateCatDto as UpdateDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(ModelSchema.name) private readonly model: Model<ModelSchema>,
  ) {}

  async create(createDto: CreateDto) {
    const created = new this.model(createDto);
    return await created.save();
  }

  async findAll() {
    const items = await this.model.find().exec();
    return items;
  }

  async findOne(_id: number) {
    const found = await this.model.findById(_id).exec();

    if (!found) {
      throw new NotFoundException(`Item with id ${_id} not found`);
    }

    return found;
  }

  async update(_id: number, updateDto: UpdateDto) {
    const found = await this.model.findById(_id).exec();

    if (!found) {
      throw new NotFoundException(`Item with id ${_id} not found`);
    }

    const currentTime = Date.now();
    const updated = await this.model
      .findByIdAndUpdate(_id, { ...updateDto, updateAt: currentTime }, { new: true })
      .exec();

    return updated;
  }

  async remove(_id: number) {
    const found = await this.model.findById(_id).exec();

    if (!found) {
      throw new NotFoundException(`Item with id ${_id} not found`);
    }

    const deleted = await this.model.findByIdAndDelete(_id).exec();

    return deleted;
  }
}
