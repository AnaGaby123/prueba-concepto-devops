import {Component} from '@angular/core';
import {forEach} from 'lodash-es';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent {
  items = [
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Atiempo',
        },
        {
          cantidad: 2,
          tipo: 'Vencido',
        },
        {
          cantidad: 2,
          tipo: 'Vencido2',
        },
        {
          cantidad: 2,
          tipo: 'Vencido3',
        },
        {
          cantidad: 2,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Atiempo',
        },
        {
          cantidad: 2,
          tipo: 'Vencido',
        },
        {
          cantidad: 2,
          tipo: 'Vencido2',
        },
        {
          cantidad: 2,
          tipo: 'Vencido3',
        },
        {
          cantidad: 2,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Atiempo',
        },
        {
          cantidad: 2,
          tipo: 'Vencido',
        },
        {
          cantidad: 2,
          tipo: 'Vencido2',
        },
        {
          cantidad: 2,
          tipo: 'Vencido3',
        },
        {
          cantidad: 2,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 3,
          tipo: 'Vencido3',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Vencido3',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 1,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 2,
          tipo: 'Atiempo',
        },
        {
          cantidad: 2,
          tipo: 'Vencido',
        },
        {
          cantidad: 2,
          tipo: 'Vencido2',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: false,
    },
    {
      Index: 2,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 3,
          tipo: 'Vencido2',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
    {
      Index: 3,
      fechaPago: new Date(),
      client: 'Procter and Gamble Manufatura, S de R.L de C.V.',
      statusColor: [
        {
          cantidad: 1,
          tipo: 'Atiempo',
        },
        {
          cantidad: 1,
          tipo: 'Moroso',
        },
      ],
      pagar: '50000.00',
      pagado: '500.00',
      credito: true,
    },
  ];

  statusColor(valor: string): string {
    switch (valor) {
      case 'Atiempo': {
        return 'green';
      }
      case 'Vencido': {
        return 'yellow';
      }
      case 'Vencido2': {
        return 'orange';
      }
      case 'Vencido3': {
        return 'red';
      }
      case 'Moroso': {
        return 'purple';
      }
    }

    return '';
  }

  // TODO: AGREGAR EL TIPADO CORRECTO
  validatorColor(items: any): string {
    let morosos = 0;
    let vencidos = 0;
    forEach(items, (o) => {
      if (o.tipo === 'Moroso') {
        morosos++;
      } else if (o.tipo === 'Vencido3') {
        vencidos++;
      }
    });

    return morosos > 0 && vencidos > 0
      ? 'backgroundPurple'
      : morosos > 0 && vencidos === 0
      ? 'backgroundPurple'
      : vencidos > 0 && morosos === 0
      ? 'backgroundYellow'
      : '';
  }
}
