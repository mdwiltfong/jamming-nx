import { CreateCollectionOptions } from 'mongodb';

interface CustomCreateCollectionOptions extends CreateCollectionOptions {
  validator?: {
    $jsonSchema?: {
      bsonType?: string;
      title: string;
      required: string[];
      properties: any;
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
        playlists: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            properties: {
              title: {
                bsonType: 'string',
                description: 'must be a string and is optional',
              },
              description: {
                bsonType: 'string',
                description: 'must be a string and is optional',
              },
            },
          },
        },
      },
    },
  },
};

export const validationSchemas = {
  userValidationSchema: userValidationSchema,
};
