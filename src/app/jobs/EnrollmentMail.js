/* eslint-disable class-methods-use-this */

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Matrícula realizada com sucesso',
      template: 'enrollment',
      context: {
        student_name: enrollment.student.name,
        plan_title: enrollment.plan.title,
        enrollment_end_date: format(
          parseISO(enrollment.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        enrollment_price: enrollment.price.toLocaleString('pt-br', {
          minimumFractionDigits: 2,
        }),
      },
    });
  }
}

export default new EnrollmentMail();
