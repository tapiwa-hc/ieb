export class NoticeGroup {
  id: number;
  name: string;
}

export interface GroupList {
  section: number;
  groups: NoticeGroup[];
}

export class NewGroup {
  constructor(public section: number, public name: string) {}
}
