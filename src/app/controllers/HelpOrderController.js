/* eslint-disable class-methods-use-this */

import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    return res.json({ ok: true });
  }

  async store(req, res) {
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new HelpOrderController();
