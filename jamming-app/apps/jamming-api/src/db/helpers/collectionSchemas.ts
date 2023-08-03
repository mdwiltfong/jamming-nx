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
      required: ['_id', 'firstName', 'lastName', 'email', 'password'],
      properties: {
        _id: {
          bsonType: 'string',
        },
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

const playlistValidationSchema: CustomCreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Playlist Object Validation',
      required: [
        '_id',
        'userId',
        'name',
        'spotifyUserId',
        'spotifyPlayListId',
        'imageUrl',
      ],
      properties: {
        _id: {
          bsonType: 'string',
        },
        userId: {
          bsonType: 'string',
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        spotifyUserId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        spotifyPlayListId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        imageUrl: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
      additionalProperties: false,
    },
  },
};

const tokensSchema: CustomCreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Token Object Schema',
      required: [
        '_id',
        'accessToken',
        'refreshToken',
        'userId',
        'expiresAt',
        'clientId',
      ],
      properties: {
        _id: {
          bsonType: 'string',
        },
        userId: {
          bsonType: 'string',
        },
        accessToken: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        refreshToken: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        clientId: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        expiresAt: {
          bsonType: 'date',
          description: 'must be a date and is required',
        },
      },
      additionalProperties: false,
    },
  },
};

export const validationSchemas: {
  userValidationSchema: CustomCreateCollectionOptions;
  playlistValidationSchema: CustomCreateCollectionOptions;
  tokensValidationSchema: CustomCreateCollectionOptions;
} = {
  userValidationSchema: userValidationSchema,
  playlistValidationSchema: playlistValidationSchema,
  tokensValidationSchema: tokensSchema,
};
