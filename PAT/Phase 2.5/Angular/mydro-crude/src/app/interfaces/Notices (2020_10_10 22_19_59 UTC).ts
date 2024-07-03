interface primary {
  title: string
  description: string
}

interface secondary extends primary {
  display_date: string
}

interface tertiary extends secondary {
  id: number
}

export interface printNotice extends primary {}

export class NewNotice implements secondary {

    constructor(
    public uID: number,
    public display_date: string,
    public gID: number,
    public title: string,
    public description: string,
    public tags?: string) {}
  
}

export interface TabularNotice extends tertiary {
  grouping_name: string
}

export interface PendingNotice extends TabularNotice {
  user: string
}

export interface FeedNotice extends tertiary {
  grouping_id: number
}

export interface Feed {
  section: number,
  notices: FeedNotice[]
}

export interface printList {
  section: number
  notices: printNotice[]
}