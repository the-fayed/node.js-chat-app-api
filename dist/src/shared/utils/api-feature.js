"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeature = void 0;
class ApiFeature {
    constructor(_mongooseQuery, reqQuery) {
        this._mongooseQuery = _mongooseQuery;
        this.reqQuery = reqQuery;
    }
    paginate(documentCount) {
        let page = parseInt(this.reqQuery.page) || 1;
        let size = parseInt(this.reqQuery.size) || 15;
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
        this._mongooseQuery = this._mongooseQuery.limit(limit).skip(skip);
        this._paginationResult = paginationResult;
        return this;
    }
    sort() {
        let sortObj;
        if (this.reqQuery.sort) {
            sortObj = this.reqQuery.sort.split(",").join(" ");
            this._mongooseQuery = this._mongooseQuery.sort(sortObj);
        }
        else {
            this._mongooseQuery = this._mongooseQuery.sort("-createdAt");
        }
        return this;
    }
    search() {
        let keyword = this.reqQuery.keyword;
        if (this.reqQuery.keyword) {
            let searchObj = {
                username: { $regex: keyword, $options: "i" },
            };
            this._mongooseQuery = this._mongooseQuery.find(searchObj);
        }
        return this;
    }
    get PaginationResult() {
        return this._paginationResult;
    }
    get MongooseQuery() {
        return this._mongooseQuery;
    }
}
exports.ApiFeature = ApiFeature;
//# sourceMappingURL=api-feature.js.map