import type { Struct, Schema } from '@strapi/strapi';

export interface TableTable extends Struct.ComponentSchema {
  collectionName: 'components_table_tables';
  info: {
    displayName: 'table';
    icon: 'layer';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'table.table': TableTable;
    }
  }
}
