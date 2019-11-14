/* eslint-disable class-methods-use-this */

import { startOfWeek, endOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const firstWeekDay = startOfWeek(new Date());
    const lastWeekDay = endOfWeek(new Date());

    const checkins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [firstWeekDay, lastWeekDay],
        },
      },
      attributes: ['created_at'],
      order: ['created_at'],
    });

    if (checkins.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Maximum checkins limit reached in this week' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      attributes: ['created_at'],
      order: ['created_at'],
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
