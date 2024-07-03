export interface NoticeGroup {
  id: number;
  name: string;
}

export interface GroupList {
  section: number;
  groups: NoticeGroup[];
}