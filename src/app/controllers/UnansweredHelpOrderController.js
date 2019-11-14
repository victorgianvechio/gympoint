/* eslint-disable class-methods-use-this */

import HelpOrder from '../models/HelpOrder';

class UnansweredHelpOrderController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({ where: { answer: null } });

    return res.json(helpOrder);
  }
}

export default new UnansweredHelpOrderController();
