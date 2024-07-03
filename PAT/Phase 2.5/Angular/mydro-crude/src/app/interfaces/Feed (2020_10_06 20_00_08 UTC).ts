export interface Feed {
  section: number,
  notices: FeedNotice[]
}
export interface FeedNotice {
  id: number,
  title: string,
  description: string,
  display_date: string,
  grouping_id: number
}
// TODO: Use previous groups interface
export interface Subs {
  name: string,
  id: number
}
