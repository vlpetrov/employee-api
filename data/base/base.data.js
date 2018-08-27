const ObjectId = require("mongodb").ObjectId;

class BaseData {
    constructor(db, modelClass) {
        this.db = db;
        this.modelClass = modelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    get(offset = 0, limit = 20, filter = '') {
        const collection = this.collection
            .find({
                $or: [
                    {"firstName": {$regex: new RegExp(filter, "i")}},
                    {"surname": {$regex: new RegExp(filter, "i")}}
                ]
            })
            .skip(offset)
            .limit(limit)
            .toArray();
        const count = this.collection.count();

        return Promise.all([collection, count]);
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        return this.collection.insertOne(model);
    }

    update(id, model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        delete model._id;

        return this.collection.updateOne({ _id: ObjectId(id) },
            {
                $set: model,
            });
    }

    delete(id) {
        return this.collection.removeOne( {_id: ObjectId(id)});
    }

    getById(id) {
        return this.collection.findOne({_id: ObjectId(id)});
    }

    _isModelValid(model) {
        return this.modelClass.isValid(model);
    }

    _getCollectionName() {
        return this.modelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
