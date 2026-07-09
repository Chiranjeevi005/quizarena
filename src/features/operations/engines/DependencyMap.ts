export class DependencyMap {
  private graph: Record<string, string[]> = {
    Runtime: ["Submission", "Revenue"],
    Submission: ["Results"],
    Results: ["Leaderboard"],
    Leaderboard: ["Certificates"],
  };

  public getImpactZone(failedService: string): string[] {
    const impacted: string[] = [];
    const traverse = (node: string) => {
      const edges = this.graph[node] || [];
      for (const edge of edges) {
        if (!impacted.includes(edge)) {
          impacted.push(edge);
          traverse(edge);
        }
      }
    };
    traverse(failedService);
    return impacted;
  }
}
