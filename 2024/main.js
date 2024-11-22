const container = document.getElementById("container")

let grid = []
for(let i = 0;i < 4;i++){
    let row = []
    for(let j = 0;j < 4;j++){
        const b = document.createElement("label")
        b.innerText = 0
         
        row.push(b)
        container.append(b)
    }
    grid.push(row)
}
const tileColors = {
    2: '#EEE4DA',    // light beige
    4: '#EDE0C8',    // beige
    8: '#F2B179',    // light orange
    16: '#F59563',   // orange
    32: '#F67C5F',   // red-orange
    64: '#F65E3B',   // red
    128: '#EDCF72',  // yellow
    256: '#EDCC61',  // gold
    512: '#EDC850',  // light gold
    1024: '#EDC53F', // golden yellow
    2048: '#EDC22E'  // bright gold
  }
function vertical_blocks(dir){
    let res = []
    for(let i = 0;i < 4;i++){
        let row = []
        if(true){
            for(let j = 0;j < 4;j++){
                row.push(Number(grid[i][j].innerText))
            }
        }
        res.push(row)
    }
    console.log(res)
    for(let i = 0;i < 4;i++){
        if(dir == "right"){
            res[i] = rotate(add(rotate(res[i])))
        }else if(dir == "left"){
                res[i] = add(res[i])
            
        }
    }
    if(dir == "up" || dir == "down"){
        let temp = []

        for(let i = 0;i < 4;i++){
            row = []
            for(let j = 0;j < 4;j++){
                row.push(res[j][i])
            }
            if(dir == "down"){
                row = add(rotate(row))
                temp.push(rotate(row))
            }else{
                row = add(row)
                temp.push(row)
            }
        }
        for(let i = 0;i < 4;i++){
            for(let j = 0;j < 4;j++){
                res[i][j] = temp[j][i]
            }
        }
    }
    console.log(res)
    if(dir == "right"){
        for(let i = 0;i < 4;i++){

            for(let j = 0;j < 4;j++){
                for(let m = 3;m > 0;m--){
                    console.log(m)
                if(res[i][m] == 0){

                    res[i][m] = res[i][m-1]
                    res[i][m-1] = 0
                }}
            }
        }
    }
    if(dir == "left"){
        for(let i = 0;i < 4;i++){

            for(let j = 0;j < 4;j++){
                for(let m = 0;m < 3;m++){
                    console.log(m)
                if(res[i][m] == 0){

                    res[i][m] = res[i][m+1]
                    res[i][m+1] = 0
                }}
            }
        }
    }
    if(dir == "down"){
        for(let i = 0;i < 4;i++){

            for(let j = 0;j < 4;j++){
                for(let m = 3;m > 0;m--){
                    console.log(m)
                if(res[m][i] == 0){

                    res[m][i] = res[m-1][i]
                    res[m-1][i] = 0
                }}
            }
        }
    }
    if(dir == "up"){
        for(let i = 0;i < 4;i++){

            for(let j = 0;j < 4;j++){
                for(let m = 0;m < 3;m++){
                    console.log(m)
                if(res[m][i] == 0){

                    res[m][i] = res[m+1][i]
                    res[m+1][i] = 0
                }}
            }
        }
    }

    display_nums(res)

}
function display_nums(arr){
    let empty_places = []
    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if(arr[i][j] == 0){
                grid[i][j].innerText = ""
                grid[i][j].style.backgroundColor = "aqua"
                empty_places.push([i,j])
            }else{
                grid[i][j].style.backgroundColor = tileColors[arr[i][j]]

                grid[i][j].innerText = arr[i][j]
            }
        }
    }
    let rand = empty_places[Math.floor(Math.random()*empty_places.length)]
    let nums = [2,4]
    grid[rand[0]][rand[1]].innerText = nums[Math.floor(Math.random()*nums.length)]
}

// console.table(vertical_blocks("h"))

function add(ar){
    let arr = []
    for(let n of ar){
        if(n!=0){
            arr.push(n)
        }
    }
    let i = 0
    let re = []
    while(i < arr.length){
        if(arr[i]==arr[i+1] && arr[i]!= 0){
            re.push(arr[i]+arr[i+1])
            i++
        }else{
            re.push(arr[i])
        }
        i++
    }
    while(re.length<4){
        re.push(0)
    }
    console.log(re,"aaaaaa")

    return re
}
function rotate(arr){
    r = arr.length - 1
    l = 0
    while(r>l){
        let temp = arr[l]
        arr[l] = arr[r]
        arr[r] = temp
        r --
        l ++
    }
    console.log(arr)
    return arr
}
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            vertical_blocks("up")
            break;
        case 'ArrowDown':
            vertical_blocks("down")
            
            break;
        case 'ArrowLeft':
            vertical_blocks("left")

            break;
        case 'ArrowRight':
            vertical_blocks("right")

            break;
    }}
)