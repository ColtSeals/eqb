// Mapeamento das letras das equipes para frases personalizadas
const teamDescriptions = {
  'b1': 'EQUIPE "BRAVO" 06:00 AS 18:30.<br>EQUIPE "CHARLIE" 18:00 AS 06:30.',
  'a1': 'EQUIPE "ALPHA" 06:00 AS 18:30.<br>EQUIPE "DELTA" 18:00 AS 06:30.',
  'e': 'EQUIPE "ECHO" 06:00 AS 18:30.<br>EQUIPE "CHARLIE" 18:00 AS 06:30.',
  'b2': 'EQUIPE "BRAVO" 06:00 AS 18:30.<br>EQUIPE "DELTA" 18:00 AS 06:30.',
  'a2': 'EQUIPE "ALPHA" 06:00 AS 18:30.<br>EQUIPE "ECHO" 18:00 AS 06:30.',
};

// Função para adicionar eventos
function addEvent(date, eventDescription) {
  if (!eventDates[date]) {
    eventDates[date] = [];
  }
  eventDates[date].push(eventDescription);
}

// Função para formatar a data
function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1; // Mês de 0 a 11
  let y = date.getFullYear();
  return `${y}-${(m <= 9 ? '0' + m : m)}-${(d <= 9 ? '0' + d : d)}`;
}

// Sequência das equipes: ['b1', 'a1', 'e', 'b2', 'a2']
const teamSequence = ['b1', 'a1', 'e', 'b2', 'a2'];

// Data de início e contagem de dias a partir de 1 de setembro de 2023
let startDate = new Date('2023-09-20T00:00:00'); // Alterado para 01 de setembro para corresponder à sequência
let daysToAdd = 365; // Defina o número de dias desejados

// Objeto para armazenar datas de eventos
var eventDates = {};

for (let i = 0; i < daysToAdd; i++) {
  let eventDate = new Date(startDate);
  eventDate.setDate(startDate.getDate() + i);

  let formattedEventDate = formatDate(eventDate);

  // Determine a equipe atual com base na sequência
  let currentTeamKey = teamSequence[i % teamSequence.length];

  // Use o mapeamento para buscar a frase personalizada
  let teamDescription = teamDescriptions[currentTeamKey] || `Equipe ${currentTeamKey}`;

  addEvent(formattedEventDate, teamDescription);
}

// Resto do seu código...

// Configurar o calendário, incluindo as datas e eventos gerados automaticamente
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9))
}

var flatpickr = $('#calendar .placeholder').flatpickr({
  inline: true,
  minDate: 'today',
  maxDate: maxDate[3],
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  // ... outras configurações ...
  onChange: function (date, str, inst) {
    var contents = '';
    if (date.length) {
      for (i = 0; i < eventDates[str].length; i++) {
        // Formate a data manualmente sem os sufixos "th"
        var formattedDate = date[0].toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        contents += '<div class="event"><div class="date">' + formattedDate + '</div><div class="location">' + eventDates[str][i] + '</div></div>';
      }
    }
    $('#calendar .calendar-events').html(contents);
  },
locale: { // Adicione a configuração de localização aqui
    weekdays: {
      shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      longhand: [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ]
    },
    months: {
      shorthand: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      longhand: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ]
    }
  }
});

eventCaledarResize($(window));
$(window).on('resize', function () {
  eventCaledarResize($(this))
});

function eventCaledarResize($el) {
  var width = $el.width()
  if (flatpickr.selectedDates.length) {
    flatpickr.clear()
  }
  if (width >= 992 && flatpickr.config.showMonths !== 3) {
    flatpickr.set('showMonths', 3)
    flatpickr.set('maxDate', maxDate[3])
  }
  if (width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
    flatpickr.set('showMonths', 2)
    flatpickr.set('maxDate', maxDate[2])
  }
  if (width < 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set('showMonths', 1)
    flatpickr.set('maxDate', maxDate[1])
    $('.flatpickr-calendar').css('width', '')
  }
}