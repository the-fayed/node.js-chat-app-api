"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeature = void 0;
class ApiFeature {
    constructor(mongooseQuery, reqQuery) {
        this.mongooseQuery = mongooseQuery;
        this.reqQuery = reqQuery;
    }
    paginate(documentCount) {
        let page = this.reqQuery.page || 1;
        let size = this.reqQuery.size || 15;
        let limit = size;
        let skip = (page - 1) * limit;
        let endIndex = page * limit;
        const paginationResult = {
            current: page,
            numberOfPages: Math.ceil(documentCount / limit),
        };
        if (endIndex < documentCount) {
            paginationResult.next = paginationResult.current + 1;
        }
        if (skip > 0) {
            paginationResult.prev = paginationResult.current - 1;
        }
        this.mongooseQuery = this.mongooseQuery.find().limit(limit).skip(skip);
        this._paginationResult = paginationResult;
        return this;
    }
    get PaginationResult() {
        return this._paginationResult;
    }
    sort() {
        let sortObj;
        if (this.reqQuery.sort) {
            sortObj = this.reqQuery.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.find().sort(sortObj);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.find().sort("-createdAt");
        }
        return this;
    }
    search() {
        let keyword = this.reqQuery.keyword;
        if (this.reqQuery.keyword) {
            let searchObj = {
                username: { $regex: keyword, $options: "i" },
            };
            this.mongooseQuery = this.mongooseQuery.find(searchObj);
        }
        return this;
    }
}
exports.ApiFeature = ApiFeature;
//# sourceMappingURL=api-feature.js.map