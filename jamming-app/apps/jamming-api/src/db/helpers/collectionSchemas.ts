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
        spotifyID: {
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
        'spotifyPlaylistId',
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
        spotifyPlaylistId: {
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

const sessionSchema: CustomCreateCollectionOptions = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Session Object Schema',
      required: ['_id', 'expires', 'session'],
      properties: {
        _id: {
          bsonType: 'string',
        },
        expires: {
          bsonType: 'date',
          description: 'must be a string and is required',
        },
        session: {
          bsonType: 'string',
          description: 'session data in the form of a JSON string',
        },
      },
      additionalProperties: false,
    },
  },
};

export const validationSchemas: {
  userValidationSchema: CustomCreateCollectionOptions;
  playlistValidationSchema: CustomCreateCollectionOptions;
  sessionSchema: CustomCreateCollectionOptions;
} = {
  userValidationSchema: userValidationSchema,
  playlistValidationSchema: playlistValidationSchema,
  sessionSchema: sessionSchema,
};
