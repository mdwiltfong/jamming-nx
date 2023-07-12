import { CreateCollectionOptions } from 'mongodb';

interface CustomCreateCollectionOptions extends CreateCollectionOptions {
  validator?: {
    $jsonSchema?: {
      bsonType?: string;
      title: string;
      required: string[];
      properties: any;
      additionalProperties: boolean;
    };
  };
}

const userValidationSchema: CustomCreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'User Object Validation',
      required: ['firstName', 'lastName', 'email', 'password', 'playlists'],
      properties: {
        firstName: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        lastName: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        email: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
      additionalProperties: false,
    },
  },
};

export const validationSchemas = {
  userValidationSchema: userValidationSchema,
};
