 const valorMetaInput = document.getElementById('valorMeta');
    const form = document.getElementById('metaForm');
    const resultadoDiv = document.getElementById('resultado');

    function formatarValor(valor) {
      
      valor = valor.replace(/[^\d,]/g, '');

     
      valor = valor.replace(/,/g, '.');

      
      const partes = valor.split('.');
      if (partes.length > 2) {
        valor = partes[0] + '.' + partes.slice(1).join('');
      }

      
      let inteiro = valor;
      let decimal = '';
      if (valor.indexOf('.') !== -1) {
        const split = valor.split('.');
        inteiro = split[0];
        decimal = split[1].slice(0,2);
      }

      inteiro = inteiro.replace(/^0+(?=\d)/, '');

      inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return decimal.length > 0 ? inteiro + ',' + decimal : inteiro;
    }

    valorMetaInput.addEventListener('input', e => {
      let cursorPos = valorMetaInput.selectionStart;
      let oldLength = valorMetaInput.value.length;

      let formatted = formatarValor(valorMetaInput.value);

      valorMetaInput.value = formatted;

      let newLength = formatted.length;
      cursorPos = cursorPos + (newLength - oldLength);
      valorMetaInput.setSelectionRange(cursorPos, cursorPos);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

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
