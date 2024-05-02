function Actualiza_total(id, precio) {
    var cantidad = parseFloat(document.getElementById('cantidad_' + id).value);// Document selecciona todo el documento => cantidad_(asi llame a todos y le sumo el id para cambiar el correcto)
    var total = cantidad * precio; //parce float lo que hace es como float en python la (str => float) y .value es tipo input y le hago lo de float porque .value te da un str
    document.getElementById('total_' + id).innerText = '$' + total.toFixed(2);//lo mismo que antes pero con el total
    Actualizar_total_final();//inner text me pone en una variable lo de adentro de () osea estoy reescribiendo lo que hay en total_id
}//to fixed redonde a los decimales que les tire adentro del parentesis

function Actualizar_total_final() {
    const rows = document.querySelectorAll('.product-row');// llama a todo lo que tenga .product-row y lo mete en una lista
    let Total_final = 0;
    rows.forEach(row => {// uso un for para recorrer la lista 
        const totalText = row.querySelector('td[id^="total_"]').innerText;//aca recorro la fila y cuando llego al total me quedo con ese valor
        const totalValue = parseFloat(totalText.replace('$', ''));//#inner text me da el valor que esta adentro de la id:ej: <td id="total_1">$0.00</td>#
        Total_final += totalValue;// voy sumando los totales de cada moneda
    });
    document.getElementById('grandTotal').innerText = '$' + Total_final.toFixed(2);
}

function boton_eliminar(id) {
    var cantidadInput = document.getElementById('cantidad_' + id);
    cantidadInput.value = 0;// vuelvo a 0 la columna de cantidad
    document.getElementById('total_' + id).innerText = '$0.00';// mismo con el la columna de precio
    Actualizar_total_final();//vuelve a hacer la suma con el total en 0
}
