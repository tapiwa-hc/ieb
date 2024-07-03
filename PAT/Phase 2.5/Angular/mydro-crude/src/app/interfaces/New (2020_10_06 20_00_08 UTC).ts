export class NewNotice {
  constructor(
  public uID: number,
  public date: string,
  public gID: number,
  public title: string,
  public description: string,
  public tags?: string) {}
}