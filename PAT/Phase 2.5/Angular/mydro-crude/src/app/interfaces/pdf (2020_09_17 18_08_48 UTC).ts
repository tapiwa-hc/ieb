export interface printList {
  section: number,
  notices: printNotice[]
}
export interface printNotice {
  title: string,
  description: string
}
// TODO inherit all notice types