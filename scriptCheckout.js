document.addEventListener('DOMContentLoaded', function() {
    const metodoPagamentoCartao = document.getElementById('cartao');
    const cartaoFields = document.getElementById('cartaoFields');
    const checkoutForm = document.getElementById('checkoutForm');
    const voltarBtn = document.getElementById('voltarBtn');

    // Mostrar ou ocultar campos do cartão de crédito com base na seleção do usuário
    metodoPagamentoCartao.addEventListener('change', function() {
        if (this.checked) {
            cartaoFields.style.display = 'block';
        } else {
            cartaoFields.style.display = 'none';
        }
    });

    // Evento de envio do formulário
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Coletar os dados do formulário
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const valor = document.getElementById('valor').value;
        const metodoPagamento = document.querySelector('input[name="metodoPagamento"]:checked');

        let dadosPagamento = {};
        if (metodoPagamento && metodoPagamento.value === 'cartao') {
            dadosPagamento = {
                numeroCartao: document.getElementById('numeroCartao').value,
                nomeTitular: document.getElementById('nomeTitular').value,
                cvv: document.getElementById('cvv').value,
                validade: document.getElementById('validade').value
            };
        }

        // Validar se todos os campos obrigatórios estão preenchidos
        if (!nome || !cpf || !endereco || (metodoPagamento && metodoPagamento.value === 'cartao' && (!dadosPagamento.numeroCartao || !dadosPagamento.nomeTitular || !dadosPagamento.cvv || !dadosPagamento.validade))) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Aqui você pode processar os dados do pagamento, por exemplo, enviar para um servidor
        // ou realizar ações específicas dependendo do método de pagamento escolhido.

        // Exemplo de lógica para simular o processamento:
        if (metodoPagamento && metodoPagamento.value === 'cartao') {
            Swal.fire({
                title: "Bom trabalho!!",
                text:`Doação realizada com cartão de crédito no valor: R$${valor}`,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
              });
        } else if (metodoPagamento && metodoPagamento.value === 'pix') {
            Swal.fire({
                title: "Bom trabalho!!",
                text: `Doação realizada via PIX no valor: R$${valor}`,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
              });
        } else {
            alert('Selecione um método de pagamento.');
            return; // Impede o envio do formulário se o método de pagamento não estiver selecionado
        }
    });

    // Botão Voltar para a Página Inicial
    voltarBtn.addEventListener('click', function() {
        window.location.href = 'index.html'; // Altere o nome do arquivo conforme necessário
    });
});

function fazerDoacao(indice) {
    // Redireciona para a página de checkout com o parâmetro do índice da ONG
    window.location.href = `checkout.html?indice=${indice}`;
}