const regex_FullText = /^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$/i
const regex_Password = /^([a-zA-Z0-9_-]){8,20}$/i
const regex_Email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
const regex_Id = /^[0-9]+$/i


export const regexFullText = (prop) => {
    return regex_FullText.test(prop)
}

export const regexPassword = (prop) => {
    return regex_Password.test(prop)
}

export const regexEmail = (prop) => {
    return regex_Email.test(prop)
}

export const regexId = (prop) => {
    return regex_Id.test(prop)
}

