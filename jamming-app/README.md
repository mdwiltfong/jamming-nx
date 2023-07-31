# Jamming-App

A web application that allows users to search for songs from Spotify and save them to the app.

## Installation

1. Clone the repository
2. Install dependencies with npm install
3. Create a .env file at the root of the project using the .env.example file as a template
4. Start the development server with npm start

## Database

The app uses MongoDB to store user data. In development, we used MongoDB's Atlas. Contributors will need to create their own instance on Atlas and update the connection string in the `.env` file.

### Connecting to the Database

To connect to the database, you'll need to create a `.env` file at the root of the project with the following field:

MONGODB_URI: the connection string for your MongoDB instance

Here's an example connection string:
`mongodb+srv://<username>:<password>@<cluster>.jjezsdh.mongodb.net/<dbname>?retryWrites=true&w=majority`

Replace <username> and <password> with your MongoDB Atlas username and password, <cluster> with the name of your MongoDB Atlas cluster, and <dbname> with the name of the database you want to use.

While in development, you can run the tests to see if your local enviornment is able to connect to your database.

## Database Structure

The app uses MongoDB to store user data. The database has two collections: `users` and `playlists`.

### Users Collection

The `users` collection stores information about each user, including their Spotify access token. Each document in the collection has the following fields:

- `_id`: unique identifier for the user
- `spotifyId`: Spotify user ID
- `accessToken`: Spotify access token

### Playlists Collection

The `playlists` collection stores information about each playlist, including its name and the user who created it. Each document in the collection has the following fields:

- `_id`: unique identifier for the playlist
- `name`: name of the playlist
- `userId`: ID of the user who created the playlist
- `songIds`: array of song IDs for the songs in the playlist

GitHub Copilot: Sure, here's an example section you could add to your README file:

## API Routes

The app uses the following API routes:

### GET /status

Returns a JSON object with a message indicating that the server is running.

### GET /users

Returns a JSON array of all users in the database.

### POST /users

Creates a new user in the database. Expects a JSON object with the following fields:

- `spotifyId`: Spotify user ID
- `accessToken`: Spotify access token

Returns a JSON object with the ID of the new user.

### GET /users/:id

Returns a JSON object with the user information for the specified ID.

### PUT /users/:id

Updates the user information for the specified ID. Expects a JSON object with the following fields:

- `accessToken`: Spotify access token

Returns a JSON object with the updated user information.

### DELETE /users/:id

Deletes the user with the specified ID.

### GET /playlists

Returns a JSON array of all playlists in the database.

### POST /playlists

Creates a new playlist in the database. Expects a JSON object with the following fields:

- `name`: name of the playlist
- `userId`: ID of the user who created the playlist
- `songIds`: array of song IDs for the songs in the playlist

Returns a JSON object with the ID of the new playlist.

### GET /playlists/:id

Returns a JSON object with the playlist information for the specified ID.

### PUT /playlists/:id

Updates the playlist information for the specified ID. Expects a JSON object with the following fields:

- `name`: name of the playlist
- `songIds`: array of song IDs for the songs in the playlist

Returns a JSON object with the updated playlist information.

### DELETE /playlists/:id

Deletes the playlist with the specified ID.

Let me know if you have any other questions!

## Usage

1. Search for songs by entering a search term in the search bar
2. Click the "+" button to add a song to your list of saved songs
3. To remove a song from your list, click the "-" button next to the song

## Technologies Used

- React
- Spotify API
- Express
- MongoDB

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Let me know if you need any help with the content or formatting!

## Start the app

In order to start the app, you will need to configure the process variables for the api in the root. There is a `.env.example` that shows the expected keys for the process variables.

To start the server, change directory to `jamming-app`. Then run `nx serve jamming-api`. This will transpile code as well. So its suggested to start the server while developing as well.

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
