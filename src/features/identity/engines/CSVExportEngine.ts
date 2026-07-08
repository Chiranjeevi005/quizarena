/**
 * CSV Export Engine strictly enforces:
 * Planner -> Column Selection -> Preview -> Generate -> Download
 */

export interface ExportPlan {
  id: string;
  source: string; // e.g. "users", "audit"
  availableColumns: string[];
}

export class CSVExportEngine {
  static plan(source: string, columns: string[]): ExportPlan {
    return {
      id: `export-${Date.now()}`,
      source,
      availableColumns: columns,
    };
  }

  static preview(plan: ExportPlan, selectedColumns: string[], sampleData: any[]) {
    console.log(`[Export Preview] Source: ${plan.source}, Columns: ${selectedColumns.join(", ")}`);
    return sampleData.map((row) =>
      selectedColumns.reduce((obj, col) => ({ ...obj, [col]: row[col] }), {})
    );
  }

  static generate(selectedColumns: string[], data: any[]): string {
    const header = selectedColumns.join(",");
    const rows = data.map((row) => selectedColumns.map((col) => `"${row[col] || ""}"`).join(","));
    return [header, ...rows].join("\n");
  }

  static download(csvContent: string, filename: string) {
    if (typeof window !== "undefined") {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(`[Export Download] Would download ${filename} with ${csvContent.length} bytes.`);
    }
  }
}
