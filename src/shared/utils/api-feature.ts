import { Document, Query } from "mongoose";
import { IPagination, IQueryString, SearchObj } from "./utils.interface";

export class ApiFeature<T extends Document> {
  private reqQuery: IQueryString;
  private _mongooseQuery: Query<T[], T>;
  private _paginationResult: IPagination | undefined;

  constructor(_mongooseQuery: Query<T[], T>, reqQuery: IQueryString) {
    this._mongooseQuery = _mongooseQuery;
    this.reqQuery = reqQuery;
  }

  paginate(documentCount: number): this {
    let page: number = parseInt(this.reqQuery.page as string) || 1;
    let size: number = parseInt(this.reqQuery.size as string) || 15;

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

    this._mongooseQuery = this._mongooseQuery.limit(limit).skip(skip) as unknown as Query<T[], T>;
    this._paginationResult = paginationResult;

    return this;
  }

  sort(): this {
    let sortObj: string;
    if (this.reqQuery.sort) {
      sortObj = this.reqQuery.sort.split(",").join(" ");
      this._mongooseQuery = this._mongooseQuery.sort(sortObj) as unknown as Query<T[], T>;
    } else {
      this._mongooseQuery = this._mongooseQuery.sort("-createdAt") as unknown as Query<T[], T>;
    }
    return this;
  }

  search(): this {
    let keyword: string = this.reqQuery.keyword;
    if (this.reqQuery.keyword) {
      let searchObj: SearchObj = {
        username: { $regex: keyword, $options: "i" },
      };
      this._mongooseQuery = this._mongooseQuery.find(searchObj) as unknown as Query<T[], T>;
    }
    return this;
  }

  get PaginationResult(): IPagination | undefined {
    return this._paginationResult;
  }

  get MongooseQuery() {
    return this._mongooseQuery;
  }
}
