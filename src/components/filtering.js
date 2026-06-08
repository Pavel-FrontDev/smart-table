// import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements) {

    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                .map(name => {// используйте name как значение и текстовое содержимое
                    const option = document.createElement('option');// @todo: создать и вернуть тег опции
                    option.value = name;
                    option.textContent = name;
                    return option;
                }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            if (input) input.value = '';
            const field = action.dataset.field;
            if (field) state[field] = '';
        }
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (
                    // ищем поля ввода в фильтре с непустыми данными
                    ['INPUT', 'SELECT'].includes(elements[key].tagName) &&
                    elements[key].value
                ) {// чтобы сформировать в query вложенный объект фильтра
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }
    return {
        updateIndexes,
        applyFiltering
    } 
}