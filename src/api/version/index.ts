import express from 'express';
import { Temp } from '../../common/utils/Temp';

const router: express.Router = express.Router();
const temp = Temp.getInstance();

router.get('', function (req, res) {
  const name = temp.getName();
  const version = temp.getVersion();

  res.json({
    name,
    version,
  });
});

export default router;
