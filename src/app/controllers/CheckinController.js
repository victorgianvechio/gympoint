/* eslint-disable class-methods-use-this */

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new CheckinController();
