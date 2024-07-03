export interface NoticeGroup {
  id: number;
  name: string;
}

export interface Section {
  section: number;
  groups: NoticeGroup[];
}