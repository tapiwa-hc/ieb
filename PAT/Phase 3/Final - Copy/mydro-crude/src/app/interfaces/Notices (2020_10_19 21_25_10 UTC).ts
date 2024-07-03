interface primaryAbstract {
  title: string;
  description: string;
}

interface secondaryAbstract extends primaryAbstract {
  display_date: string;
}

interface tertiaryAbstract extends secondaryAbstract {
  id: number;
}

export interface PrintNotice extends primaryAbstract {}

export class NewNotice implements secondaryAbstract {
  constructor(
    public uID: number,
    public display_date: string,
    public gID: number,
    public title: string,
    public description: string,
    public tags?: string
  ) {}
}

export interface FeedNotice extends secondaryAbstract {
  grouping_id: number;
}
interface TabularNotice extends tertiaryAbstract {
  grouping_name: string;
}

export interface PendingNotice extends TabularNotice {
  user: string;
}
export interface AllNotice extends TabularNotice {
  userID: number;
}

export interface Feed {
  section: number;
  notices: FeedNotice[];
}

export interface PrintList {
  section: number;
  notices: PrintNotice[];
}
