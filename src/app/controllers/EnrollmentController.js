/* eslint-disable class-methods-use-this */

import { addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      // where: { canceled_at: { [Op.not]: null } },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      where: { canceled_at: null },
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        },
        {
          model: Plan,
          attributes: ['id', 'title'],
        },
      ],
      order: ['created_at'],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .required()
        .integer(),
      plan_id: Yup.number()
        .required()
        .integer(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.price * plan.duration;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    // const schema = Yup.object().shape({
    //   plan_id: Yup.number()
    //     .required()
    //     .integer(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }

    // const enrollment = await Enrollment.findByPk(req.params.id);

    // if (!enrollment) {
    //   return res.status(401).json({ error: 'Enrollment not found' });
    // }

    // const {
    //   id,
    //   star_date,
    //   end_date,
    //   student_id,
    //   plan_id,
    // } = await enrollment.update(req.body);

    // return res.json({
    //   id,
    //   star_date,
    //   end_date,
    //   student_id,
    //   plan_id,
    // });

    return res.json({ ok: true });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(401).json({ error: 'Enrollment not found' });
    }

    enrollment.canceled_at = new Date();

    await enrollment.save();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
