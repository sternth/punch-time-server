import express from 'express';
import { name, version } from '../../pkg';

const router: express.Router = express.Router();

router.get('', function (req, res) {
  res.json({
    name,
    version,
  });
});

export default router;
