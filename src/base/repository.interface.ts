export interface IRepository<T> {
  create(model: T): Promise<any>;
  findAll(query?: any): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, model: T): Promise<any>;
  remove(id: string): Promise<any>;
}
