    function Actualiza_total(id, precio) {
        var cantidad = parseFloat(document.getElementById('cantidad_' + id).value);
        var total = cantidad * precio;
        document.getElementById('total_' + id).innerText = '$' + total.toFixed(2);
        Actualizar_total_final();
    }

    function Actualizar_total_final() {
        const rows = document.querySelectorAll('.product-row');
        let Total_final = 0;
        rows.forEach(row => {
            const totalText = row.querySelector('td[id^="total_"]').innerText;
            const valor_total_x_moneda = parseFloat(totalText.replace('$', ''));
            Total_final += valor_total_x_moneda;
        });
        document.getElementById('grandTotal').innerText = '$' + Total_final.toFixed(2);
    }

    function boton_eliminar(id) {
        var cantidadInput = document.getElementById('cantidad_' + id);
        cantidadInput.value = 0;
        document.getElementById('total_' + id).innerText = '$0.00';
        Actualizar_total_final();
    }
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('btnComprar').addEventListener('click', function() {
            var cantidades = document.querySelectorAll('.cantidad'); // Obtener todas las cantidades
            var algunaCantidadSeleccionada = Array.from(cantidades).some(cantidad => parseInt(cantidad.value) > 0);
    
            if (algunaCantidadSeleccionada) { // Si hay alguna cantidad seleccionada
                Swal.fire({
                    title: "¿Deseas realizar la compra?",
                    text: "No se puede revertir la compra.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Sí!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "¡Compra realizada!",
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Redirigir al usuario al HTML principal
                                window.location.href = "./index.html";
                            }
                        });
                    }
                });
            } else {
                alert("No se seleccionó ninguna moneda para comprar. Por favor, seleccione al menos una moneda.");
            }
        });
    });
    
    
// Función para verificar si el usuario está en un dispositivo móvil
    function detectarDispositivoMovil() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Si entras de celular te tira l< alerta y te manda para atras
    function verificarDispositivo() {
        if (detectarDispositivoMovil()) {
            alert("Por motivos de seguridad, las compras solo se pueden realizar desde una computadora.");
            window.location.href = "index.html"; // me lleva a la pagina principal
        }
    }
    // Cuando se carga compras corre la funcion
    document.addEventListener("DOMContentLoaded", function() {
        verificarDispositivo();
    });

// Función para vaciar el carrito---------------------------------------------------------------------------------
function vaciarCarrito() {
    var cantidades = document.querySelectorAll('.cantidad');// Saco las cantidades
    cantidades.forEach(function(cantidad) { //reseteo los valores
        cantidad.value = 0;
    });
    var totales = document.querySelectorAll('.total');// Actualizar los totales
    totales.forEach(function(total) {
        total.innerText = '$0.00';
    });
    document.getElementById('grandTotal').innerText = '0.00'; //Actualizo total general a 0.00
}

// Asigno el click de vaciar a la accion
document.getElementById('btnVaciarCarrito').addEventListener('click', function() {
    // Confirmar si el usuario desea vaciar el carrito
    var confirmacion = confirm('¿Está seguro de que desea vaciar el carrito?');
    if (confirmacion) {// Si me dicen que si vacio el carrito
        vaciarCarrito();
    }
});


// Función resumen --------------------------------------------------------------------------------
function generarResumenCompra() {
    var resumen = "Resumen de la compra:\n";
    var tableRows = document.querySelectorAll(".product-row");
    var hayProductos = false; // Variable para controlar si se encontraron productos con cantidad mayor a cero

    tableRows.forEach(function(row) {
        var cantidad = parseInt(row.querySelector(".cantidad").value);
        if (cantidad > 0) { // check si la cantidad es mayor a cero
            hayProductos = true;
            var productName = row.cells[1].innerText;
            var precioUnitario = parseFloat(row.cells[3].innerText.replace('$', ''));
            var total = cantidad * precioUnitario;
            resumen += productName + " - Cantidad: " + cantidad + " - Total: $" + total.toFixed(2) + "\n";
        }
    });

    if (hayProductos) { // solo monedas con cantidad mayor a cero
        var totalGeneral = calcularTotalGeneral(tableRows);
        resumen += "\nTotal General: $" + totalGeneral.toFixed(2);
        alert(resumen);// Pop up con el resumen
    } else {
        alert("No se seleccionó ninguna moneda para comprar. Por favor, inténtelo de nuevo.");
    }
}

// Función para calcular el total general
function calcularTotalGeneral(rows) {
    var totalGeneral = 0;
    rows.forEach(function(row) {
        var totalProducto = parseFloat(row.cells[4].innerText.replace('$', ''));
        totalGeneral += totalProducto;
    });
    return totalGeneral;
}






