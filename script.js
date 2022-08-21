var index= localStorage.length
var array = []
var tasks_index = []
var task_count = 0

window.addEventListener("load", pageCarregada)

function pageCarregada() {
    let check_key = false
    for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index).search("Task") != -1) {
            
            array.push(JSON.parse(localStorage.getItem(localStorage.key(index))))

            tasks_index.push(localStorage.key(index))
        } 
        if(localStorage.key(index).search("Count") != -1){
            check_key = true
        }
    }
    if (array.length > 0) {
        array.sort((a, b) => {
            return a.numero - b.numero
        })
        for (const num in array) {
            let parent = document.getElementsByClassName("tarefas")[0]
            let div_task = document.createElement("div")
            div_task.classList.add("tarefa")
            let task_h2 = document.createElement("h2")
            let task_p= document.createElement("p")
        
            let btns = document.createElement("div")
            btns.classList.add("btns")
            
            let editar = document.createElement("button")
            editar.innerText = "✏️"
            editar.addEventListener("click",edit)
        
            let remover = document.createElement("button")
            remover.innerText = "❌"
            remover.addEventListener("click",remove)
        
            btns.appendChild(editar)
            btns.appendChild(remover)
            task_h2.innerText = array[num].titulo
            task_p.innerText = array[num].texto
             
            div_task.appendChild(task_h2)
            div_task.appendChild(task_p)
            div_task.appendChild(btns)
            parent.appendChild(div_task)
        }
    }
    if (check_key == false) {
        localStorage.setItem("Count_t","0")
    }

    
}

function edit(a) {
    let title =  a.target.parentElement.parentElement.children[0]
    let text =  a.target.parentElement.parentElement.children[1]

    let edit_title = String(window.prompt("Título"))
    let edit_text = String(window.prompt("Descrição"))

    if (edit_text != "" && edit_text != "null" && edit_title != "" && edit_title != "null") {

        for (const x in array) {
            if (array[x].titulo == title.innerText && array[x].texto == text.innerText) {
                
                for (let index = 0; index < tasks_index.length; index++) {
                    if (`Task${array[x].numero}` == tasks_index[index]) {
                        let mesage_edited = {titulo: edit_title, texto: edit_text, numero: array[x].numero}

                        localStorage.setItem(`${tasks_index[index]}`,JSON.stringify(mesage_edited))
                        
                        break
                    }
                    
                }

               break
            }
        }

        title.innerText = edit_title
        text.innerText = edit_text 
        
    }
    
}


function remove(a) {
    let title =  a.target.parentElement.parentElement.children[0]
    let text =  a.target.parentElement.parentElement.children[1]
    let a_parent = a.target.parentElement

    for (const x2 in array) {
        if (array[x2].titulo == title.innerText && array[x2].texto == text.innerText) {
            
            for (let index = 0; index < tasks_index.length; index++){
                if (`Task${array[x2].numero}` == tasks_index[index]) {
                    localStorage.removeItem(`${tasks_index[index]}`)
                    break
                }
            }
    
            break
        }
    }
    a_parent.parentElement.style.display = "none"
}

function add_task() {
    let parent = document.getElementsByClassName("tarefas")[0]
    let div_task = document.createElement("div")
    div_task.classList.add("tarefa")
    let task_h2 = document.createElement("h2")
    let task_p= document.createElement("p")

    let btns = document.createElement("div")
    btns.classList.add("btns")
    
    let editar = document.createElement("button")
    editar.innerText = "✏️"
    editar.addEventListener("click",edit)

    let remover = document.createElement("button")
    remover.innerText = "❌"
    remover.addEventListener("click",remove)

    btns.appendChild(editar)
    btns.appendChild(remover)
    let edit_title = String(window.prompt("Título"))
    let edit_text = String(window.prompt("Descrição"))

    if (edit_text != "" && edit_text != "null" && edit_title != "" && edit_title != "null") {
        task_h2.innerText = edit_title
        task_p.innerText = edit_text

        
        div_task.appendChild(task_h2)
        div_task.appendChild(task_p)
        div_task.appendChild(btns)
        parent.appendChild(div_task)

        // local storage
        let m_count = Number(localStorage.getItem("Count_t"))+1
        let mensagem = {titulo: task_h2.innerText, texto: task_p.innerText, numero: m_count} 
        localStorage.setItem("Count_t",m_count)
        localStorage.setItem(`Task${m_count}`, JSON.stringify(mensagem))
    }

}

function ClearAll(a) {
    let aParent = a.parentElement.parentElement.children[1]
    let children = aParent.children
    localStorage.clear()
    for (const key in children) {  
       children[key].style.display = "none"
    }
}
