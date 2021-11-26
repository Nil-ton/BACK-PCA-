export class DataJson {
  constructor(page) {
    this.page = page
  }
  async dataPage() {
    const response = await fetch(`http://localhost:3000/${this.page}`)
    const data = await response.json()
    return data.map(item => item)
  }
}

export class Create extends DataJson {
  async table(element) {
    let output = ''
    const data = await this.dataPage()
    data.forEach((item, i) => output += `
      <div class = 'table'>
        <a href = "/pages/${this.page}/article/?${i}">
          <img src="${item.img}" alt="${item.title}">
          <div class = 'wrap-table'>
            <h1>
            <a href = "/pages/${this.page}/article/?${i}">${item.title}</a>
            </h1>
            <div class = 'p'>
              ${item.subtitle}
            </div>
          </div>
        </a>
      </div>
    `)
    document.querySelector(element).innerHTML = output
  }



  async tableEdit(element) {
    let output = ''
    const data = await this.dataPage()
    data.forEach((item, i) => output += `
      <div class = 'table'>
        <a href = "/pages/${this.page}/article/?${i}">
          <img src="${item.img}" alt="${item.title}">
          <div class = 'wrap-table'>
            <h1>
            <a href ="/pages/${this.page}/article/?${i}">${item.title}</a>
            </h1>
            <div class = 'p'>
              ${item.subtitle}
            </div>
              <div>
                <button id = 'edit'><a href = '/adm/?${this.page}?${i}' style = "color: black">Edit</a></button>
                <button id = 'del'  value = ${i} class = "${this.page}">Delete</button>
              </div>
          </div>
        </a>
      </div>
    `)   
    document.querySelector(element).innerHTML = output
  }
}


export const createTable = async (page, element) => {
  const create = new Create(page)
  await create.table(element)
}

export const createTableEdit = async (page, element) => {
  await new Create(page).tableEdit(element)
  const del = document.querySelectorAll('#del')
  del.forEach(item => item.addEventListener('click', async (e) => {
    const page = item.getAttribute('class')
    fetch(`http://localhost:3000/delete/${e.target.value}/?page=${page}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }})
  }))
}