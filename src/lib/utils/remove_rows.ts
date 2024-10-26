export function removeRows (data: any[], selected:Record<string, boolean>){
    for (let key in selected) {
        console.log("Key:", key);
        const index = data.indexOf(data[Number(key)]);
        console.log(Number(key));
        console.log(index);
        if (index > -1) {
            data.splice(index, 1);
        }
        $inspect(data[2]);
    }
}