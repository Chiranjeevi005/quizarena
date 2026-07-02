export class ImportGraphBuilder {
  private graph: Map<string, string[]> = new Map();

  addDependency(fromFile: string, toFile: string) {
    if (!this.graph.has(fromFile)) {
      this.graph.set(fromFile, []);
    }
    this.graph.get(fromFile)!.push(toFile);
  }

  getGraph(): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const [k, v] of this.graph.entries()) {
      result[k] = v;
    }
    return result;
  }
}

export class ExportGraphBuilder {
  // Can track what files export what, useful for unused export detection
}

export class CircularDependencyDetector {
  static detect(graph: Record<string, string[]>): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const stack = new Set<string>();

    const visit = (node: string, path: string[]) => {
      if (stack.has(node)) {
        const cycleStart = path.indexOf(node);
        cycles.push(path.slice(cycleStart));
        return;
      }
      if (visited.has(node)) return;

      visited.add(node);
      stack.add(node);
      path.push(node);

      const deps = graph[node] || [];
      for (const dep of deps) {
        visit(dep, [...path]);
      }

      stack.delete(node);
    };

    for (const node of Object.keys(graph)) {
      if (!visited.has(node)) {
        visit(node, []);
      }
    }

    return cycles;
  }
}

export class OrphanFileDetector {
  static detect(files: string[], reverseDependencyCounts: Record<string, number>): string[] {
    return files.filter(f => !reverseDependencyCounts[f] || reverseDependencyCounts[f] === 0);
  }
}
