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
    