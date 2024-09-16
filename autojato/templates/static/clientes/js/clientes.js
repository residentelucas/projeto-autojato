function add_carro() {
    const container = document.getElementById('form-carro');
    const html = `
        <br>
        <div class='row'>
            <div class='col-md'>
                <input type='text' placeholder='Carro' class='form-control' name='carro'>
            </div>
            <div class='col-md'>
                <input type='text' placeholder='Placa' class='form-control' name='placa'>
            </div>
            <div class='col-md'>
                <input type='number' placeholder='Ano' class='form-control' name='ano'>
            </div>
        </div>`;
    container.innerHTML += html;
}

function exibir_form(tipo) {
    const add_cliente = document.getElementById('adicionar-cliente');
    const att_cliente = document.getElementById('att_cliente');

    if (tipo === "1") {
        att_cliente.style.display = "none";
        add_cliente.style.display = "block";
    } else if (tipo === "2") {
        add_cliente.style.display = "none";
        att_cliente.style.display = "block";
    }
}

function dados_cliente() {
    const cliente = document.getElementById('cliente-select');
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const id_cliente = cliente.value;

    const data = new FormData();
    data.append('id_cliente', id_cliente);

    fetch("/clientes/atualiza_cliente/", {
        method: "POST",
        headers: {
            'X-CSRFToken': csrf_token,
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-att-cliente').style.display = 'block';

        document.getElementById('id').value = data['cliente_id'];
        document.getElementById('nome').value = data['cliente']['nome'];
        document.getElementById('sobrenome').value = data['cliente']['sobrenome'];
        document.getElementById('cpf').value = data['cliente']['cpf'];
        document.getElementById('email').value = data['cliente']['email'];

        const div_carros = document.getElementById('carros');
        div_carros.innerHTML = '';

        data['carros'].forEach(carro => {
            const carroHtml = `
                <form action='/clientes/update_carro/${carro.id}' method='POST'>
                    <div class='row'>
                        <div class='col-md'>
                            <input class='form-control' name='carro' type='text' value='${carro.fields.carro}'>
                        </div>
                        <div class='col-md'>
                            <input class='form-control' name='placa' type='text' value='${carro.fields.placa}'>
                        </div>
                        <div class='col-md'>
                            <input class='form-control' type='number' name='ano' value='${carro.fields.ano}'>
                        </div>
                        <div class='col-md'>
                            <input class='btn btn-lg btn-success' type='submit' value='Salvar'>
                        </div>
                    </div>
                </form>
                <a href='/clientes/excluir_carro/${carro.id}' class='btn btn-lg btn-danger'>Excluir</a>
                <br>`;
            div_carros.innerHTML += carroHtml;
        });
    });
}

function update_cliente() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const id = document.getElementById('id').value;
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(`/clientes/update_cliente/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data['status'] === '200') {
            console.log('Dados alterados com sucesso');
        } else {
            console.log('Ocorreu algum erro');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
