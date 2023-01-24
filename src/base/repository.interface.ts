export interface IRepository<T> {
  create(model: T): Promise<any>;
  findAll(query?: any): Promise<T[]>;
  findById(id: string): Promise<T>;
  findOne(query: any): Promise<T>;
  update(id: string, model: T): Promise<any>;
  remove(id: string): Promise<any>;
}
