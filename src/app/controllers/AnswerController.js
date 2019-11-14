/* eslint-disable class-methods-use-this */

import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const helpOder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOder) {
      return res.status(401).json({ error: 'Help Order not found' });
    }

    helpOder.answer = req.body.answer;
    helpOder.answer_at = new Date();

    await helpOder.save();

    await Queue.add(AnswerMail.key, { helpOder });

    return res.json(helpOder);
  }
}

export default new AnswerController();
