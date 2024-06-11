function testeJava(){
    console.log('a');
}

function mostrarDetalhes(row) {
    var nextTr = row.nextElementSibling;

    if (nextTr && nextTr.classList.contains('details-row')) {
        nextTr.classList.toggle('hidden');
    }
}