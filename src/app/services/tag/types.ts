export type Tag = {
    id: string,
    type: string,
    attributes: {
      name: {
        en: string
      },
      description: {},
      group: string,
      version: number
    },
    relationships: Array<any>,
    selected?: boolean // Pode ter por causa do map feito em filters.components.ts
}