 const valorMetaInput = document.getElementById('valorMeta');
    const form = document.getElementById('metaForm');
    const resultadoDiv = document.getElementById('resultado');

    // Função para formatar número com pontos a cada 3 dígitos e vírgula para decimais
    function formatarValor(valor) {
      // Remove tudo que não for número ou vírgula
      valor = valor.replace(/[^\d,]/g, '');

      // Troca vírgula por ponto para manipulação
      valor = valor.replace(/,/g, '.');

      // Se tiver mais de um ponto, remove os extras
      const partes = valor.split('.');
      if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
      }

      // Se tiver ponto (decimal), separa inteiro e decimal
      let inteiro = valor;
      let decimal = '';
      if (valor.indexOf('.') !== -1) {
        const split = valor.split('.');
        inteiro = split[0];
        decimal = split[1].slice(0,2); // pega até 2 casas decimais
      }

      // Remove zeros à esquerda
      inteiro = inteiro.replace(/^0+(?=\d)/, '');

      // Formata o inteiro com pontos a cada 3 dígitos
      inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Junta inteiro e decimal com vírgula
      return decimal.length > 0 ? inteiro + ',' + decimal : inteiro;
    }

    // Evento para formatar enquanto digita
    valorMetaInput.addEventListener('input', e => {
      let cursorPos = valorMetaInput.selectionStart;
      let oldLength = valorMetaInput.value.length;

      let formatted = formatarValor(valorMetaInput.value);

      valorMetaInput.value = formatted;

      // Ajusta cursor para ficar no lugar correto
      let newLength = formatted.length;
      cursorPos = cursorPos + (newLength - oldLength);
      valorMetaInput.setSelectionRange(cursorPos, cursorPos);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Para cálculo, converte valor formatado para número float
      let valorMetaStr = valorMetaInput.value.replace(/\./g, '').replace(',', '.');
      const valorMeta = parseFloat(valorMetaStr);

      const prazo = parseInt(document.getElementById('prazo').value);
      const tipoPrazo = document.getElementById('tipoPrazo').value;

      if (isNaN(valorMeta) || valorMeta <= 0) {
        alert('Por favor, insira um valor válido para a meta.');
        return;
      }

      if (isNaN(prazo) || prazo <= 0) {
        alert('Por favor, insira um prazo válido.');
        return;
      }

      let valorPorDia, valorPorSemana;

      if (tipoPrazo === 'dias') {
        valorPorDia = valorMeta / prazo;
        valorPorSemana = valorPorDia * 7;
      } else {
        valorPorSemana = valorMeta / prazo;
        valorPorDia = valorPorSemana / 7;
      }

      // Formata os valores de saída com separador de milhar e vírgula decimal
      function formatarSaida(num) {
        return num.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }

      resultadoDiv.style.display = 'block';
      resultadoDiv.innerHTML = `
        <p><strong>Meta:</strong> R$ ${formatarSaida(valorMeta)}</p>
        <p><strong>Prazo:</strong> ${prazo} ${tipoPrazo}</p>
        <hr />
        <p>Você precisa guardar:</p>
        <ul>
          <li>R$ <strong>${formatarSaida(valorPorDia)}</strong> por dia</li>
          <li>R$ <strong>${formatarSaida(valorPorSemana)}</strong> por semana</li>
        </ul>
      `;

      resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });