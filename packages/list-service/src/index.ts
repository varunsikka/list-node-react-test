import { Router } from 'src/interfaces/api-routes';

async function initialize() {
  const router = new Router();
  await router.initialize();
}

initialize().catch((err) => {
  console.error(err);
  process.exit(1);
});
