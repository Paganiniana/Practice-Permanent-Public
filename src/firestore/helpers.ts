// takes a plain object
// returns a new object with all the same values
// but with no id 
export const removeId = function(obj: any) {
    let new_obj: any = {}
    Object.keys(obj).map((key: string) => {
        if (key !== 'id') {
            new_obj[key] = obj[key]
        }
    })
    return new_obj
}