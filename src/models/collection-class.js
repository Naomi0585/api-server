'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
  try {
    return await this.model.create(obj);
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}

async read(id = null, options = {}) {
  try {
    if (id) {
      return await this.model.findOne({
        where: { id },
        ...options,
      });
    }

    return await this.model.findAll(options);
  } catch (error) {
    console.error('Read error:', error);
    throw error;
  }
}

async update(id, obj) {
  try {
    const record = await this.model.findOne({
      where: { id },
    });

    if (!record) {
      return null;
    }

    return await record.update(obj);
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

async delete(id) {
  try {
    const record = await this.model.findOne({
      where: { id },
    });

    if (!record) {
      return null;
    }

    await record.destroy();

    return null;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

}

module.exports = Collection;