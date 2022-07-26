// Total des transactions selon un type
export const total_incomes_or_expenses = (collection,typeAsString) => collection.reduce((total,val)=>{
    if(val.type == typeAsString){
total += Number(val.amount)
    }
    return total
},0)

// METHODE DE CALCUL DE LA BALANCE
export const balance = (a, b) => {
    let total = a - b
    return total.toFixed(2)
}

