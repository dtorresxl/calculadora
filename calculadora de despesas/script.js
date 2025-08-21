const form = document.getElementById('form');
const listaDespesas = document.getElementById('lista-despesas');
const totalDisplay = document.getElementById('total');
const sobrandoDisplay = document.getElementById('sobrando');
const valorTotalInput = document.getElementById('valorTotal');
let total = 0;

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!isNaN(valor)) {
        total += valor;
        const despesaElement = document.createElement('div');
        despesaElement.className = 'despesa';
        despesaElement.textContent = `${descricao}: R$ ${valor.toFixed(2)}`;

        const removerButton = document.createElement('button');
        removerButton.className = 'remover';
        removerButton.textContent = 'Remover';
        removerButton.onclick = function() {
            total -= valor;
            totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
            listaDespesas.removeChild(despesaElement);
            atualizarSobrando();
        };

        despesaElement.appendChild(removerButton);
        listaDespesas.appendChild(despesaElement);
        totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
        atualizarSobrando();
        form.reset();
    }
});

valorTotalInput.addEventListener('input', atualizarSobrando);

function atualizarSobrando() {
    const valorTotal = parseFloat(valorTotalInput.value) || 0;
    const sobrando = valorTotal - total;
    sobrandoDisplay.textContent = `Sobrou: R$ ${sobrando.toFixed(2)}`;
}