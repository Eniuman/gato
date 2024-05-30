const input = ["nombre", "informacion"];

        const extraerDatos = () => {
            let datos = {};
            input.forEach((campo) => {
                const valor = document.getElementById(campo).value;
                datos[campo] = valor;
            });
            const imagenInput = document.getElementById("imagen");
            const imagenArchivo = imagenInput.files[0];
            datos.imagen = imagenArchivo;
            return datos;
        }

        const crearContenedor = (datos) => {
            const contenedor = document.createElement("div");
            contenedor.classList.add("contenedor");

            // Agregar los datos al contenedor
            for (const campo in datos) {
                if (campo !== 'imagen') {
                    const parrafo = document.createElement("p");
                    parrafo.textContent = `${campo}: ${datos[campo]}`;
                    contenedor.appendChild(parrafo);
                } else if (datos[campo]) {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(datos[campo]);
                    img.style.maxWidth = "100%";
                    contenedor.appendChild(img);
                }
            }

            // Crear botones de editar y borrar
            const botonesDiv = document.createElement("div");
            botonesDiv.classList.add("botones");

            const editarBtn = document.createElement("button");
            editarBtn.textContent = "Editar";
            editarBtn.onclick = () => editarContenedor(contenedor, datos);
            botonesDiv.appendChild(editarBtn);

            const borrarBtn = document.createElement("button");
            borrarBtn.textContent = "Borrar";
            borrarBtn.onclick = () => contenedor.remove();
            botonesDiv.appendChild(borrarBtn);

            contenedor.appendChild(botonesDiv);

            // Agregar el contenedor al documento
            document.body.appendChild(contenedor);
        }

        const editarContenedor = (contenedor, datos) => {
            input.forEach((campo) => {
                const nuevoValor = prompt(`Editar ${campo}`, datos[campo]);
                if (nuevoValor !== null) {
                    datos[campo] = nuevoValor;
                }
            });

            const nuevaImagen = document.createElement("input");
            nuevaImagen.type = "file";
            nuevaImagen.accept = "image/*";
            nuevaImagen.onchange = () => {
                const nuevaImagenArchivo = nuevaImagen.files[0];
                if (nuevaImagenArchivo) {
                    datos.imagen = nuevaImagenArchivo;
                }
            };
            nuevaImagen.click();

            // Actualizar el contenido del contenedor
            contenedor.innerHTML = '';

            for (const campo in datos) {
                if (campo !== 'imagen') {
                    const parrafo = document.createElement("p");
                    parrafo.textContent = `${campo}: ${datos[campo]}`;
                    contenedor.appendChild(parrafo);
                } else if (datos[campo]) {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(datos[campo]);
                    img.style.maxWidth = "40%";
                    contenedor.appendChild(img);
                }
            }

            // Crear botones de editar y borrar nuevamente
            const botonesDiv = document.createElement("div");
            botonesDiv.classList.add("botones");

            const editarBtn = document.createElement("button");
            editarBtn.textContent = "Editar";
            editarBtn.onclick = () => editarContenedor(contenedor, datos);
            botonesDiv.appendChild(editarBtn);

            const borrarBtn = document.createElement("button");
            borrarBtn.textContent = "Borrar";
            borrarBtn.onclick = () => contenedor.remove();
            botonesDiv.appendChild(borrarBtn);

            contenedor.appendChild(botonesDiv);
        }

        const obtener = () => {
            // Llamar a la función para extraer datos del formulario
            const datos = extraerDatos();
            // Crear un nuevo contenedor con los datos extraídos
            crearContenedor(datos);
        }

        // Esperar a que el DOM esté completamente cargado
        document.addEventListener("DOMContentLoaded", () => {
            const botonObtener = document.getElementById("obtener");
            botonObtener.addEventListener("click", obtener);
        });