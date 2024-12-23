import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';

export const contactSchemaLiteral = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    physicalAddress: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
    isFavourited: {
      type: 'boolean',
    },
    category: {
      type: 'string',
    },
  },
  required: ['id', 'phoneNumber'],
  indexes: ['id'],
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schemaTyped = toTypedRxJsonSchema(contactSchemaLiteral);

// aggregate the document type from the schema
export type Contact = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>;

// create the typed RxJsonSchema from the literal typed object.
export const contactSchema: RxJsonSchema<Contact> = contactSchemaLiteral;
