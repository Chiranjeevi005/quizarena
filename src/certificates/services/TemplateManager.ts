export interface CertificateTemplate {
  id: string;
  version: string;
  htmlTemplate: string;
  isLocked: boolean;
}

export class TemplateManager {
  private templates: Map<string, CertificateTemplate> = new Map();

  constructor() {
    // Seed with a default template
    this.templates.set('default-1.0', {
      id: 'default',
      version: '1.0',
      htmlTemplate: '<h1>Certificate of Completion</h1><p>Awarded to {{name}}</p>',
      isLocked: true // Production templates are locked
    });
  }

  getTemplate(id: string, version: string): CertificateTemplate | null {
    return this.templates.get(`${id}-${version}`) || null;
  }

  createTemplate(id: string, version: string, htmlTemplate: string) {
    const key = `${id}-${version}`;
    if (this.templates.has(key)) {
      if (this.templates.get(key)!.isLocked) {
        throw new Error("Cannot modify a locked template. Create a new version.");
      }
    }
    
    this.templates.set(key, { id, version, htmlTemplate, isLocked: false });
  }

  lockTemplate(id: string, version: string) {
    const key = `${id}-${version}`;
    const template = this.templates.get(key);
    if (!template) throw new Error("Template not found");

    template.isLocked = true;
    this.templates.set(key, template);
  }
}

export const templateManager = new TemplateManager();
