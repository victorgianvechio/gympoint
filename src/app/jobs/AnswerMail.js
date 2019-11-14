/* eslint-disable class-methods-use-this */

import Mail from '../../lib/Mail';

class AnswerEmail {
  get key() {
    return 'AnswerEmail';
  }

  async handle({ data }) {
    const { helpOder } = data;

    await Mail.sendMail({
      to: `${helpOder.student.name} <${helpOder.student.email}>`,
      subject: 'Pergunta respondida',
      template: 'answer',
      context: {
        student_name: helpOder.student.name,
        question: helpOder.question,
        answer: helpOder.answer,
      },
    });
  }
}

export default new AnswerEmail();
