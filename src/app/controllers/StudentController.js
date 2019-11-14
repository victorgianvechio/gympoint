/* eslint-disable class-methods-use-this */

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      res.status(401).json({ error: 'Student not found' });
    }

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
