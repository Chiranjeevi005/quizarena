export class InboxEngine {
  public async addMessage(userId: string, payload: any): Promise<void> {
    // Add to persistent in-app inbox
  }

  public async getInbox(userId: string, filters: any): Promise<any[]> {
    return [];
  }

  public async markAsRead(messageId: string): Promise<void> {
    // State: UNREAD -> READ
  }

  public async archive(messageId: string): Promise<void> {
    // State -> ARCHIVED
  }
}
