import { Document, Query } from "mongoose";
import { IPagination, IQueryString, SearchObj } from "./utils.interface";

export class ApiFeature<T extends Document> {
  private reqQuery: IQueryString;
  private mongooseQuery: Query<T[], T>;
  private _paginationResult: IPagination | undefined;

  constructor(mongooseQuery: Query<T[], T>, reqQuery: IQueryString) {
    this.mongooseQuery = mongooseQuery;
    this.reqQuery = reqQuery;
  }

  paginate(documentCount: number): this {
    let page: number = this.reqQuery.page || 1;
    let size: number = this.reqQuery.size || 15;

    let limit: number = size;
    let skip: number = (page - 1) * limit;
    let endIndex: number = page * limit;

    const paginationResult: IPagination = {
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

  get PaginationResult(): IPagination | undefined {
    return this._paginationResult;
  }

  sort(): this {
    let sortObj: string;
    if (this.reqQuery.sort) {
      sortObj = this.reqQuery.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.find().sort(sortObj);
    } else {
      this.mongooseQuery = this.mongooseQuery.find().sort("-createdAt");
    }
    return this;
  }

  search(): this {
    let keyword: string = this.reqQuery.keyword;
    if (this.reqQuery.keyword) {
      let searchObj: SearchObj = {
        username: { $regex: keyword, $options: "i" },
      };
      this.mongooseQuery = this.mongooseQuery.find(searchObj);
    }
    return this;
  }
}
