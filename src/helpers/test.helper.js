import { compose } from "redux"

export const findByTestAttribute = (component, name) => {
    const wrapper = component.find(`[data-test="${name}"]`);
    return wrapper;
}

export const getInputValue = (component) => {
    return +component.find('input').instance().value;
}