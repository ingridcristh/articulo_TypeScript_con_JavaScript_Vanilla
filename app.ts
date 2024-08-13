// Definiendo la interfaz para el tipo Item
interface Item {
    id: string;
    nombre: string;
}

// Seleccionando elementos del DOM
const formularioItem = document.getElementById('formularioItem') as HTMLFormElement;
const listaItems = document.getElementById('listaItems') as HTMLUListElement;
const inputItem = document.getElementById('item') as HTMLInputElement;

// Cargando items desde localStorage
const cargarItems = (): Item[] => {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
};

// Guardando items en localStorage
const guardarItems = (items: Item[]) => {
    localStorage.setItem('items', JSON.stringify(items));
};

// Añadiendo un nuevo item
const agregarItem = (nombre: string) => {
    const items = cargarItems();
    const nuevoItem: Item = {
        id: new Date().toISOString(),
        nombre
    };
    items.push(nuevoItem);
    guardarItems(items);
};

// Eliminando un item por ID
const eliminarItem = (id: string) => {
    const items = cargarItems();
    const itemsActualizados = items.filter(item => item.id !== id);
    guardarItems(itemsActualizados);
};

// Editando un item por ID
const editarItem = (id: string, nuevoNombre: string) => {
    const items = cargarItems();
    const item = items.find(item => item.id === id);
    if (item) {
        item.nombre = nuevoNombre;
        guardarItems(items);
    }
};

// Renderizando la lista de items
const renderizarItems = () => {
    const items = cargarItems();
    listaItems.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nombre;
        listaItems.appendChild(listItem);

        // Añadiendo eventos para editar y eliminar el item
        listItem.addEventListener('dblclick', () => {
            const nuevoNombre = prompt('Editar item:', item.nombre);
            if (nuevoNombre !== null) editarItem(item.id, nuevoNombre);
            renderizarItems();
        });

    });
};

// Inicializando la aplicación
formularioItem.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputItem.value.trim();
    if (nombre) {
        agregarItem(nombre);
        inputItem.value = '';
        renderizarItems();
    }
});

// Renderizando items al cargar la página
renderizarItems();
