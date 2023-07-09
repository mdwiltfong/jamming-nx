import app from './server';

const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/ `);
});
export { httpServer };
export default app;
